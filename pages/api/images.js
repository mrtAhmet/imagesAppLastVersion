import pool from "@/lib/db"; // MySQL bağlantısını içe aktarıyoruz

export default async function handler(req, res) {
  const { q, sort } = req.query; // Arama ve sıralama parametreleri
  console.log(sort);

  let connection;
  try {
    connection = await pool.getConnection(); // Bağlantıyı al

    let query = `
      SELECT * 
      FROM images
      WHERE title LIKE ? OR tags LIKE ?
    `;

    // Sıralama işlemi
    switch (sort) {
      case "new":
        query += " ORDER BY uploadTime DESC";
        break;
      case "old":
        query += " ORDER BY uploadTime ASC";
        break;
      case "most-liked":
        query += " ORDER BY likeCount DESC";
        break;
      default:
        query += " ORDER BY uploadTime DESC";
        break;
    }

    const [rows] = await connection.query(query, [`%${q}%`, `%${q}%`]); // Güvenli parametre geçişi

    res.status(200).json(rows);
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ error: "Veritabanı hatası" });
  } finally {
    if (connection) connection.release(); // Bağlantıyı serbest bırak
  }
}
