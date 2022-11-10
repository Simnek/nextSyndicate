import Link from 'next/link';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <Link href='/' className={classes.logo}>Union</Link>
      <nav>
        <ul>
          <li>
            <Link href='/auth'>Login</Link>
          </li>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
