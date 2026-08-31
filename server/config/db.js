import mongoose from 'mongoose';

// Cache the connection for serverless warm reuse
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Return cached connection if already connected
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    cached.promise = mongoose.connect(uri, {
      maxPoolSize: 5,
      // Netlify functions timeout at 10s (free) or 26s (paid).
      // Keep these well under the function timeout so we can return a proper error.
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 20000,
      family: 4,       // Force IPv4 — avoids DNS lookup delays on serverless
      retryWrites: true,
      w: 'majority',
    }).then((mongooseInstance) => {
      console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
      return mongooseInstance;
    }).catch((err) => {
      // Log full error details so Netlify function logs show the real problem
      console.error('MongoDB connection failed:', {
        message: err.message,
        code: err.code,
        uri: uri.replace(/:\/\/[^@]+@/, '://***:***@'), // mask credentials in logs
      });
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // reset so next request retries
    throw error;
  }

  return cached.conn;
};

export default connectDB;