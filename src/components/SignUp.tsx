import { FC, memo } from 'react';
import { SignInterfase } from '../interface/SignInterfase';
import { useSignUp } from './hooks/useSignUp';

export const SignUp: FC = memo(() => {
  const { signUpUser, isDesable, handleChangeObjectState, handleSubmitToFirebase } = useSignUp();
  return (
    <SignInterfase
      signFunction="登録"
      handleSubmit={handleSubmitToFirebase}
      handleChange={handleChangeObjectState}
      email={signUpUser.email}
      password={signUpUser.password}
      isDesable={isDesable}
    />
  );
});

SignUp.displayName = 'SignUp';
