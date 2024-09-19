import mysql, { Pool } from 'mysql2/promise';

let pool: Pool | undefined;

if (!pool) {
    pool = mysql.createPool({
        host: 'ci-cd.mysql.database.azure.com',
        port:3306,
        user: 'isaac',
        password: 'Azure@success', // Ensure this is correct
        database: 'testing',
        ssl: 'require',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 28800, //28 seconds
    });
}
