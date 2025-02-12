import { Storage } from "@google-cloud/storage";

// Google Cloud Storage istemcisini oluşturma
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // JSON dosyasının yolu .env.local'den alınır
  projectId: process.env.GCP_PROJECT_ID, // Google Cloud projenizin ID'si
});

const bucketName = process.env.GCP_BUCKET_NAME; // Bucket adı

/**
 * Google Cloud Storage'a dosya yükler
 * @param {Buffer} fileBuffer - Yüklenen dosyanın Buffer nesnesi
 * @param {string} fileName - Yüklenen dosyanın adı
 * @param {string} contentType - Dosyanın türü
 * @returns {string} - Yüklenen dosyanın erişilebilir URL'si
 */
export async function uploadToGoogleCloud(file, fileName, contentType) {
  try {
    // File nesnesini Buffer'a dönüştür
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: contentType || "application/octet-stream",
    });

    // Dosya yüklemesini tamamla
    return new Promise((resolve, reject) => {
      blobStream.on("error", (err) => {
        console.error("Google Cloud Upload Error:", err);
        reject(new Error("Dosya yüklenirken hata oluştu"));
      });

      blobStream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        console.log("File uploaded successfully:", publicUrl);
        resolve(publicUrl); // URL'yi döndür
      });

      blobStream.end(fileBuffer);
    });
  } catch (error) {
    console.error("Google Cloud Storage Error:", error);
    throw new Error("Google Cloud Storage’a yükleme başarısız oldu");
  }
}
