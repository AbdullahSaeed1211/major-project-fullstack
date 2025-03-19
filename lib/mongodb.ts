"use server";
import mongoose from "mongoose";

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection;
}

if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

export async function connectToDatabase() {
  try {
    // If we have a connection, return it
    if (global.mongoose.conn) {
      console.log("MongoDB already connected");
      return global.mongoose.conn;
    }

    // If we have a pending connection promise, return it
    if (global.mongoose.promise) {
      console.log("MongoDB pending connection promise, returning it");
      return await global.mongoose.promise;
    }

    // Set up connection options with optimized settings for Next.js
    const opts = {
      bufferCommands: false,
      maxPoolSize: 5, // Increased for better concurrent request handling
      maxIdleTimeMS: 30000, // Reduced to free up resources faster
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    };

    // Create new connection promise
    global.mongoose.promise = mongoose.connect(MONGODB_URI as string, opts);
    global.mongoose.conn = await global.mongoose.promise;

    // Handle connection events
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    console.log("MongoDB connection successful, returning connection");
    return global.mongoose.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    global.mongoose.promise = null;
    throw new Error("Failed to connect to MongoDB");
  }
}

// Only export disconnect for testing purposes
export async function disconnect() {
  if (!global.mongoose.conn) return;
  
  await mongoose.connection.close();
  global.mongoose.conn = null;
  global.mongoose.promise = null;
}

// Export as default for backward compatibility
export default connectToDatabase; 