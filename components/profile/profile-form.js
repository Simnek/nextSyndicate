import classes from './profile-form.module.css';

import { useRef } from 'react';

function ProfileForm(props) {
  const newPassRef = useRef();
  const oldPassRef = useRef();

  const changePassSubmitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPassRef.current.value;
    const enteredOldPassword = oldPassRef.current.value;

    //Add validation


    props.onChangePass({
      newPassword: enteredNewPassword,
      oldPassword: enteredOldPassword
    });
  }

  return (
    <form onSubmit={changePassSubmitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPassRef} type='password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input ref={oldPassRef} type='password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
