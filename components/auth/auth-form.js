import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import classes from './auth-form.module.css';

async function createUser(email, password, passwordConfirm) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, passwordConfirm }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  console.log(data);

  return data;
}

// async function checkIfVerified(email) {
//   const response = await fetch('/api/auth/isVerified', {
//     method: 'POST',
//     body: JSON.stringify({ email }),
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   });

//   console.log(response);
//   if (!response.ok) {
//     throw new Error('Something went wrong!');
//   }

//   return false;
// }

function AuthForm() {
  const router = useRouter();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordInputRefConfirm = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMessage, setMessage] = useState(null);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredPasswordConfirm;
    if (!isLogin) {
      enteredPasswordConfirm = passwordInputRefConfirm.current.value;
    }

    //optional: Add validation

    //const isVerified = await checkIfVerified(enteredEmail);

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
        //verified: isVerified
      });
      if (!result.error) {
        router.replace('/profile');
      } else {
        setIsLoading(false);
        setMessage(result.error);
      }

    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword, enteredPasswordConfirm);
        console.log("Zato sto sam", result);
        if (result.message.substring(0, 10) === "Email sent") {
          setIsLogin((prevState) => !prevState);
        }
        setMessage(result.message);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        {!isLogin && <div className={classes.control}>
          <label htmlFor='passwordConfirm'>Confirm Password</label>
          <input ref={passwordInputRefConfirm} type='password' id='passwordConfirm' required />
        </div>}
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          {isMessage}
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
