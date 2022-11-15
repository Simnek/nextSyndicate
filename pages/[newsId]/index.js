import Head from 'next/head'
import NewsDetail from "../../components/news/NewsDetail";

import { MongoClient, ObjectId } from 'mongodb';

const News = (props) => {

  return (
    <>
      <Head>
        <title>{props.newsData.title}</title>
        <meta name='description' content={props.newsData.description} />
      </Head>
      <NewsDetail
        title={props.newsData.title}
        description={props.newsData.description}
      />
    </>
  )
};

export async function getStaticPaths() {
  const uri = "mongodb+srv://sdItDev:hTxVCd70vmwI5gQl@cluster0.egpair0.mongodb.net/?retryWrites=true&w=majority";
  //const uri = "mongodb://PC318147:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";
  const client = await MongoClient.connect(uri);

  const db = client.db('prod');

  const newsCollection = db.collection('news');

  const news = await newsCollection.find({}, { _id: 1 }).toArray(); //only get a part of objects, in this case _id

  client.close();

  return {
    fallback: 'blocking', //has to be specified (boolean), false means you cannot get a page with no specified id in paths (404),
    //for true it will dynamically pregenerate on request so you can only specified frequently visited ids and not all
    //difference between blocking and true is that with blocking you dont have to implement a loader etc., it just wont show anything untill it loads
    paths: news.map(newss => ({ params: { newsId: newss._id.toString() } }))
  }
}

export async function getStaticProps(context) { //context isnt the same as getServerSideProps, it doesnt have .req and .res
  const newsId = context.params.newsId; //getting concrete meetupId (name has to be the same as [meetupId])
  const uri = "mongodb+srv://sdItDev:hTxVCd70vmwI5gQl@cluster0.egpair0.mongodb.net/?retryWrites=true&w=majority";
  console.log(newsId);
  //const uri = "mongodb://PC318147:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";
  const client = await MongoClient.connect(uri);

  const db = client.db('prod');

  const newsCollection = db.collection('news');

  const selectedNews = await newsCollection.findOne({ _id: ObjectId(newsId) });

  client.close();
  //since this is pregenerated, we dont have an id requested so with getStaticProps we need
  //getStaticPaths() so we tell next what to pregenerate

  return {
    props: {
      newsData: {
        id: selectedNews._id.toString(),
        title: selectedNews.title,
        description: selectedNews.description
      }
    },
    revalidate: 1
  }
}

export default News;