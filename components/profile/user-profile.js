import Link from "next/link";

import classes from './user-profile.module.css';

function UserProfile() {
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then(session => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   })
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>
  // } //we dont need it cause we check if loged in on server side in pages/profile.js

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <Link href='/profile/change-password'>ChangePassword</Link>
    </section>
  );
}

export default UserProfile;