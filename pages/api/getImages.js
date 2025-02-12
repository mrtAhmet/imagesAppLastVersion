// pages/api/getImages.js
import sql from "mssql";
import pool from "@/lib/db"; // MySQL bağlantısını içe aktarıyoruz

// Tüm görüntüleri almak için API fonksiyonu
export const getImages = async () => {
  let connection;
  try {
    connection = await pool.getConnection(); // Havuzdan bağlantı al

    // SQL sorgusunu çalıştır ve sonucu al
    const [rows] = await connection.query(
      "SELECT * FROM images ORDER BY uploadTime DESC LIMIT 12"
    );

    return rows; // MySQL'de sonuç doğrudan döner, `recordset` yoktur
  } catch (error) {
    console.error("Database query error: ", error);
    throw new Error("Veritabanından veri çekme hatası");
  } finally {
    if (connection) connection.release(); // Bağlantıyı kapat
  }
};

// Arama fonksiyonu
export const getQuery = async (searchQuery) => {
  let connection;
  try {
    connection = await pool.getConnection();

    // SQL sorgusunu parametreli olarak çalıştır
    const [rows] = await connection.query(
      `SELECT * FROM images WHERE title LIKE ? OR tags LIKE ?`,
      [`%${searchQuery}%`, `%${searchQuery}%`] // LIKE için parametreler
    );

    return rows;
  } catch (error) {
    console.error("Database query error: ", error);
    throw new Error("Veritabanından veri çekme hatası");
  } finally {
    if (connection) connection.release();
  }
};

// Belirli bir görüntüyü ID ile almak için fonksiyon
const getImageById = async (req, res) => {
  const { ID } = req.query;

  let connection;
  try {
    connection = await pool.getConnection();

    const [rows] = await connection.query(
      "SELECT * FROM images WHERE ID = ?",
      [ID]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Görüntü bulunamadı" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Database query error: ", error);
    return res
      .status(500)
      .json({ message: "Veritabanından veri çekme hatası" });
  } finally {
    if (connection) connection.release();
  }
};

// API'yi yönlendirmek için fonksiyon
export default async function handler(req, res) {
  if (req.method === "GET" && req.query.ID) {
    return await getImageById(req, res);
  } else if (req.method === "GET") {
    return res.status(200).json(await getImages());
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
