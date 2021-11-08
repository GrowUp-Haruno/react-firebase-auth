import { FC, memo } from 'react';
import { FormInterfase } from '../interface/FormInterfase';

import { useSignUp } from './hooks/useSignUp';
import { AcountUserTypes } from './types/typeSign';

export const SignUp: FC = memo(() => {
  const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } = useSignUp();
  return (
    <FormInterfase<AcountUserTypes>
      formTitle="ユーザー登録"
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
      buttonName="登録"
      buttonState={buttonState}
    />
  );
});

SignUp.displayName = 'SignUp';
