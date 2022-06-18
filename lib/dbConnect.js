import mongoose from "mongoose";

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const server = `mongodb+srv://${user}:${password}@0.28cdt.mongodb.net/${database}?retryWrites=true&w=majority`;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const config = { useNewUrlParser: true, useUnifiedTopology: true };

    cached.promise = mongoose.connect(server, config).then(() => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;