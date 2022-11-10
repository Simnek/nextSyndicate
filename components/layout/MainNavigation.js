import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const { data: session, status } = useSession();

  console.log("session", session);
  console.log("status", status);

  return (
    <header className={classes.header}>
      <Link href='/' className={classes.logo}>Union</Link>
      <nav>
        <ul>
          {!session && (status != 'loading') && <li>
            <Link href='/auth'>Login</Link>
          </li>}
          {session && <li>
            <Link href='/profile'>Profile</Link>
          </li>}
          {session && <li>
            <button onClick={() => signOut()}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
