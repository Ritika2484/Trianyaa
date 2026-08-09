import mongoose from "mongoose";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache: MongooseCache = globalForMongoose.mongooseCache ?? {
  connection: null,
  promise: null,
};

if (process.env.NODE_ENV !== "production") {
  globalForMongoose.mongooseCache = cache;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (cache.connection) return cache.connection;

  if (!cache.promise) {
    cache.promise = mongoose.connect(
      uri,
      process.env.MONGODB_DB_NAME ? { dbName: process.env.MONGODB_DB_NAME } : undefined
    );
  }

  try {
    cache.connection = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.connection;
}
