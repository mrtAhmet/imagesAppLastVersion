import pool from '@/lib/db'

export default async function handler(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM images ORDER BY uploadTime DESC LIMIT 12");
        res.status(200).json({ message: "Bağlantı Başarılı", data: rows })
    } catch (error) {
        res.status(500).json({ message: "Başarısız bağlantı", error })
    }
}
