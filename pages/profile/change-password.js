import { getSession } from "next-auth/react";

import ChangePasswordForm from "../../components/forms/ChangePasswordForm";

const ChangePassword = () => {

  const changePassHandler = async (passwordData) => {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <ChangePasswordForm onChangePass={changePassHandler} />
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