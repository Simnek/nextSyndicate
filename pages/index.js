import StartingPage from '../components/start/starting-page';

import connectToDatabase from '../lib/db';
//import { MongoClient } from 'mongodb';

export default function Home(props) {
  return <StartingPage news={props.news} />
}


export async function getStaticProps() {
  //const uri = "mongodb+srv://sdItDev:hTxVCd70vmwI5gQl@cluster0.egpair0.mongodb.net/?retryWrites=true&w=majority";
  //const uri = "mongodb://PC318147:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";
  //const uri = "mongodb://10.21.57.43:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";
  //const client = await MongoClient.connect(uri);
  const client = await connectToDatabase();

  const db = client.db('prod');

  const newsCollection = db.collection('news');

  const news = await newsCollection.find().toArray();

  client.close();

  return {
    props: {
      news: news.map(newss => ({
        title: newss.title,
        id: newss._id.toString()
      }))
    },
    revalidate: 1
  }
}