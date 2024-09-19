import mysql, { Pool } from 'mysql2/promise';

let pool: Pool | undefined;

if (!pool) {
    pool = mysql.createPool({
        host: 'ci-cd.mysql.database.azure.com',
        user: 'isaac',
        password: 'Azure@success', // Ensure this is correct
        database: 'testing',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 28800,  // 10 seconds
    });
}

export default pool!;
