let mysql;
if (typeof window === 'undefined') {
  mysql = require('mysql2/promise');
}

import { config } from "@/lib/db";

export default async function saveImage(image) {
  if (!mysql) {
    throw new Error("MySQL module can only be used on the server side.");
  }

  let connection;
  try {
    // MySQL bağlantısını oluştur
    connection = await mysql.createConnection(config);

    // SQL sorgusunu hazırla
    const query = `
      INSERT INTO images (username, title, tags, imageURL, imageDesc) 
      VALUES (?, ?, ?, ?, ?)
    `;

    // Sorguyu çalıştır
    await connection.execute(query, [
      image.username,
      image.title,
      image.tags,
      image.imageURL,
      image.imageDesc,
    ]);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save image.");
  } finally {
    // Bağlantıyı kapat
    if (connection) await connection.end();
  }
}
