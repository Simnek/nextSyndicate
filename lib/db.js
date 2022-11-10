import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const uri = "mongodb://PC318147:27017/prod?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";
  const client = await MongoClient.connect(uri);

  return client;
}