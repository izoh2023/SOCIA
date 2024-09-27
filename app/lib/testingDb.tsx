import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI ||'mongodb+srv://isaac:MongoDb21@cluster0.6ltkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(uri!);

export default async function run() {
  try {
    // Connect to the database
    await client.connect();
    
    const schoolDb = client.db('school');
    console.log('Connected to database');
    
    // Return the school database object
    return schoolDb;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}
