import pool from "@/lib/db"; // MySQL bağlantısını içe aktarıyoruz

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { ID, action } = req.body;

    let connection;
    try {
      // Bağlantıyı al
      connection = await pool.getConnection();

      // Aksiyon kontrolü
      let query;
      if (action === "decrement") {
        query = "UPDATE images SET likeCount = likeCount - 1 WHERE ID = ?";
      } else {
        query = "UPDATE images SET likeCount = likeCount + 1 WHERE ID = ?";
      }

      // SQL sorgusunu çalıştırıyoruz
      await connection.query(query, [ID]);

      res.status(200).json({ message: "Like count updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    } finally {
      if (connection) connection.release(); // Bağlantıyı serbest bırakıyoruz
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
