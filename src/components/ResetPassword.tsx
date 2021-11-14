import { Heading, Stack } from '@chakra-ui/react';
import { Dispatch, FC, memo, SetStateAction } from 'react';
import Card from '../atoms/Card';
import SecondaryButton from '../atoms/SecondaryButton';
import { useSignIn } from './hooks/useSignIn';

//Propsの型定義
type PropsType = { setMode: Dispatch<SetStateAction<'SignIn' | 'SignUp' | 'ResetPassword'>> };

const ResetPassword: FC<PropsType> = memo(({ setMode }) => {
  // 間借り中
  const {  buttonState } = useSignIn();
  return (
    <Stack spacing={8} mx={'auto'} maxW={'xl'} minW={'lg'} py={12} px={6}>
      <Heading fontSize="3xl">パスワード再発行</Heading>
      <Card>
        <SecondaryButton
          buttonName="ログインはこちら"
          type="button"
          buttonState={buttonState}
          onClick={() => setMode('SignUp')}
        />
        <SecondaryButton
          buttonName="新規登録はこちら"
          type="button"
          buttonState={buttonState}
          onClick={() => setMode('SignUp')}
        />
      </Card>
    </Stack>
  );
});

ResetPassword.displayName = 'ResetPassword';
export default ResetPassword;
