import { Heading, Spacer, Stack } from '@chakra-ui/react';
import { Dispatch, FC, memo, SetStateAction } from 'react';
import Card from '../Elements/Card';
import SecondaryButton from '../Elements/SecondaryButton';
import { FormInterfase } from './FormInterfase';

import { useSignUp } from './hooks/useSignUp';
import { AcountUserTypes } from './types/typeSign';

type PropsType = { setMode: Dispatch<SetStateAction<'SignIn' | 'SignUp' | 'ResetPassword'>> };

export const SignUp: FC<PropsType> = memo(({ setMode }) => {
  const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } = useSignUp();
  return (
    <Stack spacing={8} mx={'auto'} maxW={'xl'} minW={'lg'} py={12} px={6}>
      <Heading fontSize="3xl">ユーザー登録</Heading>
      <Card>
        <FormInterfase<AcountUserTypes>

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
        <Spacer />
        <SecondaryButton
          buttonName="ログインはこちら"
          type="button"
          buttonState={buttonState}
          onClick={() => setMode('SignIn')}
        />
        <SecondaryButton
          buttonName="パスワードを忘れた方はこちら"
          type="button"
          buttonState={buttonState}
          onClick={() => setMode('ResetPassword')}
        />
      </Card>
    </Stack>
  );
});

SignUp.displayName = 'SignUp';
