import mongoose from "mongoose";

const uri = process.env.MONGODB_URI ?? process.env.MONGO_URI;

declare global {
  var __rqsMongooseConnection__: Promise<typeof mongoose> | undefined;
}

export async function connectToDatabase() {
  if (!uri) {
    return null;
  }

  if (!global.__rqsMongooseConnection__) {
    global.__rqsMongooseConnection__ = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB ?? "rqs",
    });
  }

  return global.__rqsMongooseConnection__;
}
