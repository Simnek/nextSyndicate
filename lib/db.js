import { MongoClient } from "mongodb";

import { config } from "../config";

export default async function connectToDatabase() {
  //const uri = "mongodb://PC318147:27017/prod?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";
  //const uri = "mongodb+srv://sdItDev:hTxVCd70vmwI5gQl@cluster0.egpair0.mongodb.net/?retryWrites=true&w=majority";
  const uri = config.dbAtlas;
  const client = await MongoClient.connect(uri);

  return client;
}