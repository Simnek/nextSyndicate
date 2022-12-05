import Head from 'next/head';
import connectToDatabase from '../../lib/db';

const Verify = (props) => {

  return (
    <>
      <Head>
        <title>Verify</title>
      </Head>
    </>
  )
}

export async function getServerSideProps(context) {
  //const uri = "mongodb://PC318147:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000";

  const client = await connectToDatabase();

  const db = client.db('prod');

  const userCollection = db.collection('users');

  const exists = userCollection.findOne({ token: context.query.token })
  console.log(context.query.token);

  if (exists) {
    const filter = { token: context.query.token };
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