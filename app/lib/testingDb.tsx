// import fs from 'fs';
// import mysql, { Pool } from 'mysql2/promise';

// let pool: Pool | undefined;
// const serverCa = [fs.readFileSync("/var/www/html/DigiCertGlobalRootCA.crt.pem", "utf8")];

// // let conn: Connection

// if (!pool) {
//     pool = mysql.createPool({
//         host: 'ci-cd.mysql.database.azure.com',
//         port:3306,
//         user: 'isaac',
//         password: 'Azure@success', // Ensure this is correct
//         database: 'testing',
//         ssl: {
//             rejectUnauthorized: true,
//             ca: serverCa
//         },
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0,
//         connectTimeout: 28800, //28 seconds
//     });
// }




// export default pool!;



import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://isaac:MongoDb@success@cluster0.6ltkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const db = client.db('testing');

export const collection = db.collection('person')
 

