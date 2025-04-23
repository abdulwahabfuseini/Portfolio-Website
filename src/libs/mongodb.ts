import mongoose from "mongoose";
import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  throw new Error("Please add your DATABASE_URL to .env.local");
}

const DATABASE_URL: string = process.env.DATABASE_URL;

let prisma: PrismaClient;


if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  
  const globalWithPrisma = global as typeof globalThis & {
    prisma?: PrismaClient; 
  };

  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }

  prisma = globalWithPrisma.prisma;
}


const globalWithMongoose = global as typeof globalThis & {
  mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
};
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}


const cached = globalWithMongoose.mongoose;
let isConnected = false;


export const connectMongoDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    if (cached?.conn) {
      return cached.conn;
    }

    if (!cached?.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
        isConnected = true;
        console.log("Connected to MongoDB");
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
};

export { prisma };