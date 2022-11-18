import { getSession } from "next-auth/react";
import Link from "next/link";

import classes from '../../components/profile/user-profile.module.css';

const ChangePassword = () => {

  return (
    <section className={classes.profile}>
      <Link href='/profile/change-password'>ChangePassword</Link>
    </section>
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