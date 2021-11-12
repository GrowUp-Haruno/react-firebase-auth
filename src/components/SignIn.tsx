import { FC, memo } from 'react';
import { useSignIn } from './hooks/useSignIn';
import { AcountUserTypes } from './types/typeSign';
import { FormInterfase } from '../interface/FormInterfase';
import Card from '../atoms/Card';
import { Stack, Heading } from '@chakra-ui/react';

export const SignIn: FC = memo(() => {
  const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } = useSignIn();
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Heading fontSize="3xl">🎉チャットアプリへようこそ🎉</Heading>
      <Card>
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
      </Card>
    </Stack>
  );
});

SignIn.displayName = 'SignIn';
