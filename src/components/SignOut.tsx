import { FC, memo } from 'react';
import { useSignOut } from './hooks/useSignOut';

export const SignOut: FC = memo(() => {
  const { handleSignOut } = useSignOut();
  return (
    <>
      <h1>サインアウト</h1>
      <button onClick={handleSignOut}>サインアウト</button>
    </>
  );
});

SignOut.displayName = 'SignOut';
