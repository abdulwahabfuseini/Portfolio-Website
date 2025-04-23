import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
  throw new Error("Please add your Mongo URI to .env");
}

const uri: string = process.env.DATABASE_URL;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>; 
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri);
    try {
      globalWithMongoClientPromise._mongoClientPromise = client.connect();
      console.log("Connected to MongoDB (Development)"); 
    } catch (error) {
      console.error("Error connecting to MongoDB (Development):", error);
      throw error; 
    }
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  try {
    clientPromise = client.connect();
    console.log("Connected to MongoDB (Production)"); 
  } catch (error) {
    console.error("Error connecting to MongoDB (Production):", error);
    throw error; 
  }
}

export default clientPromise;
