import Head from 'next/head';

import connectToDatabase from '../../../lib/db';
//import { MongoClient } from 'mongodb';

const Verify = () => {

  return (
    <>
      <Head>
        <title>Verify</title>
      </Head>
    </>
  )
}

export async function getStaticPaths() {
  //const uri = "mongodb+srv://sdItDev:hTxVCd70vmwI5gQl@cluster0.egpair0.mongodb.net/?retryWrites=true&w=majority";
  //const uri = "mongodb://PC318147:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";
  //const uri = "mongodb://10.21.57.43:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";

  //const client = await MongoClient.connect(uri);
  const client = await connectToDatabase();

  const db = client.db('prod');

  const userCollection = db.collection('users');

  const users = await userCollection.find({}, { token: 1 }).toArray(); //only get a part of objects, in this case _id

  client.close();

  return {
    fallback: 'blocking', //has to be specified (boolean), false means you cannot get a page with no specified id in paths (404),
    //for true it will dynamically pregenerate on request so you can only specified frequently visited ids and not all
    //difference between blocking and true is that with blocking you dont have to implement a loader etc., it just wont show anything untill it loads
    paths: users.map(user => ({ params: { token: user.token.toString() } }))
  }
}

export async function getStaticProps(context) {
  //const uri = "mongodb://PC318147:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";
  //const uri = "mongodb://10.21.57.43:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";
  //const client = await MongoClient.connect(uri);
  const client = await connectToDatabase();

  const db = client.db('prod');

  const userCollection = db.collection('users');

  const exists = userCollection.findOne({ token: context.params.token })
  console.log(context.params);

  if (exists) {
    const filter = { token: context.params.token };
    const updateUser = {
      $set: {
        verifiedAt: 1
      },
    };
    const result = await userCollection.updateOne(filter, updateUser);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  }

  client.close();

  return {
    props: {
    }
  };
}

export default Verify;