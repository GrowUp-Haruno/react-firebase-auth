import { FC, memo } from 'react';
import { useSignIn } from './hooks/useSignIn';
import { AcountUserTypes } from './types/typeSign';
import { FormInterfase } from '../interface/FormInterfase';

export const SignIn:FC = memo(() => {
  const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } =
    useSignIn();
  return (
    <FormInterfase<AcountUserTypes>
      formTitle="ログイン"
      inputParts={[
        {
          labelName: 'メールアドレス',
          inputName: 'email',
          inputType: 'email',
          inputPlaceholder: 'メールアドレス',
        },
        {
          labelName: 'パスワード',
          inputName: 'password',
          inputType: 'password',
          inputPlaceholder: 'パスワード',
        },
      ]}
      handleSubmit={handleSubmit}
      handleChange={handleChangeObjectState}
      inputValueState={inputValueState}
      buttonName="ログイン"
      buttonState={buttonState}
    />
  );
});

SignIn.displayName = 'SignIn';
