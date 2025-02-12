// import pool from "@/lib/db"; // MySQL bağlantısını içe aktarıyoruz

// export default async function slugImage(req, res) {
//   const { q } = req.query; // Query string'den gelen arama parametresi
//   console.log(q);

//   let connection;
//   try {
//     connection = await pool.getConnection(); // Bağlantıyı al

//     let query = `
//       SELECT *
//       FROM images
//       WHERE title LIKE ?
//     `;
//     const [rows] = await connection.query(query, [`%${q}%`]); // Güvenli parametre geçişi

//     res.status(200).json(rows);
//   } catch (error) {
//     console.error("Database query error: ", error);
//     res.status(500).json({ error: "Veritabanı hatası" });
//   } finally {
//     if (connection) connection.release(); // Bağlantıyı serbest bırak
//   }
// }
