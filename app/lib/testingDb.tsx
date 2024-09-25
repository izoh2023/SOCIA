// import fs from 'fs';
import mysql, { Pool } from 'mysql2/promise';

let pool: Pool | undefined;
// const serverCa = [fs.readFileSync("/var/www/html/DigiCertGlobalRootCA.crt.pem", "utf8")];

// let conn: Connection

if (!pool) {
    pool = mysql.createPool({
        // host: 'ci-cd.mysql.database.azure.com',
        // port:3306,
        // user: 'isaac',
        // password: 'Azure@success', // Ensure this is correct
        // database: 'testing',
        // ssl: {
        //     rejectUnauthorized: true,
        //     ca: serverCa
        // },
        host: 'localhost',
        user: 'isaac',
        password: '',
        database: 'testing',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        // connectTimeout: 28800, //28 seconds
    });
}




export default pool!;

