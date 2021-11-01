import { signOut } from 'firebase/auth';
import { FC, memo, useCallback } from 'react';
import { auth } from '../firebase';

export const SignOut: FC = memo(() => {
  const handleClick = useCallback(async () => {
    await signOut(auth);
  }, []);
  return (
    <>
      <h1>サインアウト</h1>
      <button onClick={handleClick}>サインアウト</button>
    </>
  );
});

SignOut.displayName = 'SignOut';
