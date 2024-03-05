import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;


let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

let isConnected = false;

export const connectMongoDB = async () => {

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };
  
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
      cached.conn = await cached.promise;
      return cached.conn;
    }

    isConnected = true;
    console.log("Connected to MongoDB");
    
  } catch (error) {
    console.error("Connection Failed", error); 
    throw new Error("Failed to connect to MongoDB");
  }
}


