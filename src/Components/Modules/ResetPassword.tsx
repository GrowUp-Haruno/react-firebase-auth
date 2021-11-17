import { Heading, Spacer, Stack } from '@chakra-ui/react';
import { Dispatch, FC, memo, SetStateAction } from 'react';

import Card from '../Elements/Card';
import SecondaryButton from '../Elements/SecondaryButton';
import { FormInterfase } from './FormInterfase';
import { useResetPassword } from './hooks/useResetPassword';
import { ResetUserType } from './types/typeResetPassword';

//Propsの型定義
type PropsType = { setMode: Dispatch<SetStateAction<'SignIn' | 'SignUp' | 'ResetPassword'>> };

const ResetPassword: FC<PropsType> = memo(({ setMode }) => {
  const {
    inputValueState,
    buttonState,
    handleChangeObjectState,
    handleSubmit,
  } = useResetPassword();

  return (
    <Stack spacing={8} mx={'auto'} maxW={'xl'} minW={'lg'} py={12} px={6}>
      <Heading fontSize="3xl">パスワード再設定</Heading>

      <Card>
        <FormInterfase<ResetUserType>
          inputParts={[
            {
              labelName: 'メールアドレス',
              inputName: 'email',
              inputType: 'email',
              inputPlaceholder: 'メールアドレス',
            },
          ]}
          handleSubmit={handleSubmit}
          handleChange={handleChangeObjectState}
          inputValueState={inputValueState}
          buttonName="登録メールアドレスへ送信"
          buttonState={buttonState}
        />

        <Spacer />

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
