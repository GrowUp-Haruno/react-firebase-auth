import { FC, memo } from 'react';
import Card from '../Elements/Card';
import { useFirebase } from './hooks/useFirebase';

export const SignOut: FC = memo(() => {
  return (
    <>
      <Card>
        <button onClick={useFirebase().userSignOut}>サインアウト</button>
      </Card>
    </>
  );
});

SignOut.displayName = 'SignOut';
