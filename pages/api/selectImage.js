import pool from "@/lib/db"; // MySQL bağlantısını içe aktarıyoruz

export default async function getImage(req, res) {
  // Query'den ID değerini alıyoruz
  const { id } = req.query;

  let connection;
  try {
    connection = await pool.getConnection(); // Bağlantıyı al

    let query = "SELECT * FROM images WHERE ID = ?";
    const [rows] = await connection.query(query, [id]); // ID parametre olarak geçildi

    // Başarılı sonucu geri döndürüyoruz
    res.status(200).json(rows);
  } catch (error) {
    console.log("Database query error: ", error);
    res.status(500).json({ error: "Veritabanı hatası" });
  } finally {
    if (connection) connection.release(); // Bağlantıyı serbest bırak
  }
}
