import { updateCurrentUser, updateProfile, User } from 'firebase/auth';
import { FC, memo, useCallback } from 'react';
import { auth } from '../firebase';

type propTypes = {
  signInUser: User;
};

export const SignOut: FC<propTypes> = memo(({ signInUser }) => {
  console.log(auth.currentUser?.displayName)
  const handleClick = useCallback(async () => {
    await updateProfile(signInUser, {
      displayName: `${signInUser.displayName}a`,
      photoURL: 'test',
    });
    await updateCurrentUser(auth, signInUser);
  }, [signInUser]);
  return (
    <>
      <h1>サインアウト</h1>
      <p>{signInUser.displayName}</p>
      <p>{auth.currentUser?.displayName}</p>
      <button onClick={handleClick}>サインアウト</button>
    </>
  );
});

SignOut.displayName = 'SignOut';
