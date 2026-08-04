import { MongoClient } from 'mongodb';

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  // Graceful fallback for build step or missing env variables
  clientPromise = Promise.resolve(null as any);
} else {
  const mongoUri = process.env.MONGODB_URI as string;
  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(mongoUri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(mongoUri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;
