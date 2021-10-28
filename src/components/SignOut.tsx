import { FC, memo } from 'react';

export const SignOut: FC = memo(() => {
  const handleClick = () => {
    
  };
  return (
    <>
      <h1>サインアウト</h1>
      <button onClick={handleClick}>サインアウト</button>
    </>
  );
});

SignOut.displayName = 'SignOut';
