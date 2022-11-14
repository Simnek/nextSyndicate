import Head from 'next/head'
import NewsDetail from "../../components/news/NewsDetail";

const News = (props) => {

  return (
    <>
      <Head>
        <title>{props.newsData.title} Details</title>
        <meta name='description' content={props.newsData.description} />
      </Head>
      <NewsDetail
        title={props.newsData.title}
        description={props.newsData.description}
      />
    </>
  )
};

export default News;