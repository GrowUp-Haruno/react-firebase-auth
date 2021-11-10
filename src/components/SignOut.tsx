import { FC, memo } from 'react';
import { useFirebase } from './hooks/useFirebase';

export const SignOut: FC = memo(() => {
  return (
    <>
      <button onClick={useFirebase().userSignOut}>サインアウト</button>
    </>
  );
});

SignOut.displayName = 'SignOut';
