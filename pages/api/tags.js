import pool from "@/lib/db"; // MySQL bağlantısını içe aktarıyoruz

export default async function getTags(req, res) {
  const { tag, sort } = req.query;
  console.log(sort);

  let connection;
  try {
    connection = await pool.getConnection(); // MySQL bağlantısını al

    let query = `SELECT * FROM images WHERE tags LIKE ?`;

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

    const [rows] = await connection.query(query, [`%${tag}%`]); // Güvenli parametre geçişi

    res.status(200).json(rows);
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ error: "Veritabanı hatası" });
  } finally {
    if (connection) connection.release(); // Bağlantıyı serbest bırak
  }
}
