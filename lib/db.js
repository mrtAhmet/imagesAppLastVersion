// export const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_DATABASE,
//   port: parseInt(process.env.DB_PORT, 10),
//   options: {
//     encrypt: false, // Local bağlantılar için genelde false
//     enableArithAbort: true,
//   },
// };


import mysql from "mysql2/promise";

export const config = {
  host: process.env.DB_HOST, // MySQL sunucu adresi
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(config);

export default pool;
