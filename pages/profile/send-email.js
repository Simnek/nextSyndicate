import { getSession } from "next-auth/react";

import EmailForm from "../../components/forms/EmailForm";

const SendEmail = () => {

  return (
    <EmailForm />
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

export default SendEmail;