import { MongoClient } from "mongodb";

declare global {
  var __rqsMongoClientPromise__: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;

export function getMongoClient() {
  if (!uri) {
    return null;
  }

  if (!global.__rqsMongoClientPromise__) {
    const client = new MongoClient(uri);
    global.__rqsMongoClientPromise__ = client.connect();
  }

  return global.__rqsMongoClientPromise__;
}
