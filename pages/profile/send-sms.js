import { getSession } from "next-auth/react";

import SmsForm from "../../components/forms/SmsForm";

const SendSms = () => {

  return (
    <SmsForm />
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

export default SendSms;