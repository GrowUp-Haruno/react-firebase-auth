import { Dispatch, FC, memo, SetStateAction } from 'react';
import { useSignIn } from './hooks/useSignIn';
import { AcountUserTypes } from './types/typeSign';
import { FormInterfase } from './FormInterfase';
import Card from '../Elements/Card';
import { Stack, Heading, Spacer } from '@chakra-ui/react';
import SecondaryButton from '../Elements/SecondaryButton';

type PropsType = { setMode: Dispatch<SetStateAction<'SignIn' | 'SignUp' | 'ResetPassword'>> };

export const SignIn: FC<PropsType> = memo(({ setMode }) => {
  const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } = useSignIn();
  return (
    <Stack spacing={8} mx={'auto'} maxW={'xl'} minW={'lg'} py={12} px={6}>
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
        <Spacer />
        <SecondaryButton
          buttonName="新規登録はこちら"
          type="button"
          buttonState={buttonState}
          onClick={() => setMode('SignUp')}
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

SignIn.displayName = 'SignIn';
