import { Dispatch, FC, memo, SetStateAction } from 'react';
import { useSignIn } from './hooks/useSignIn';
import { AcountUserTypes } from './types/typeSign';
import { FormInterfase } from '../interface/FormInterfase';
import Card from '../atoms/Card';
import { Stack, Heading,Spacer, Button } from '@chakra-ui/react';

export const SignIn: FC<{ setIsSignIn: Dispatch<SetStateAction<boolean>> }> = memo(
  ({ setIsSignIn }) => {
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
          <Spacer/>
          <Button  fontsize="3xl">新規登録</Button>
          <Button fontsize="3xl">パスワードを忘れた方はこちら</Button>
        </Card>
      </Stack>
    );
  }
);

SignIn.displayName = 'SignIn';
