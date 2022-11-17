import { getSession } from "next-auth/react";

import NewsForm from "../../components/forms/NewsForm";

const AddNews = () => {

  return (
    <NewsForm />
  )
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    };
  }

  return {
    props: { session },
  }
}

export default AddNews;