import { FC, memo } from 'react';
import { SignInterfase } from '../interface/SignInterfase';
import { useSignIn } from './hooks/useSignIn';

export const SignIn: FC = memo(() => {
  const { signInUser, isDesable, handleChangeObjectState, handleSubmitToFirebase } = useSignIn();
  return (
    <SignInterfase
      signFunction="ログイン"
      handleSubmit={handleSubmitToFirebase}
      handleChange={handleChangeObjectState}
      email={signInUser.email}
      password={signInUser.password}
      isDesable={isDesable}
    />
  );
});

SignIn.displayName = 'SignIn';
