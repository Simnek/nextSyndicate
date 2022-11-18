import { getSession } from "next-auth/react";

import ChangePasswordForm from "../../components/forms/ChangePasswordForm";

const ChangePassword = () => {



  return (
    <ChangePasswordForm />
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

export default ChangePassword;