import { Dispatch, FC, memo, SetStateAction, useEffect } from 'react';
import { useSignIn } from './hooks/useSignIn';
import { AcountUserTypes } from './types/typeSign';
import { FormInterfase } from './FormInterfase';
import Card from '../Elements/Card';
import { Stack, Heading, Spacer } from '@chakra-ui/react';
import SecondaryButton from '../Elements/SecondaryButton';

type PropsType = { setMode: Dispatch<SetStateAction<'SignIn' | 'SignUp' | 'ResetPassword'>> };

export const SignIn: FC<PropsType> = memo(({ setMode }) => {
  const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } = useSignIn();
  useEffect(() => {
    return () => {
      
    }
  }, [])
  return (
    <Stack spacing={8} mx={'auto'} maxW={'xl'} minW={'lg'} py={12} px={6}>
      <Heading fontSize="3xl">πγγ£γγγ’γγͺγΈγγγγπ</Heading>
      <Card>
        <FormInterfase<AcountUserTypes>
          formTitle="γ­γ°γ€γ³"
          inputParts={[
            {
              labelName: 'γ‘γΌγ«γ’γγ¬γΉ',
              inputName: 'email',
              inputType: 'email',
              inputPlaceholder: 'γ‘γΌγ«γ’γγ¬γΉ',
            },
            {
              labelName: 'γγΉγ―γΌγ',
              inputName: 'password',
              inputType: 'password',
              inputPlaceholder: 'γγΉγ―γΌγ',
            },
          ]}
          handleSubmit={handleSubmit}
          handleChange={handleChangeObjectState}
          inputValueState={inputValueState}
          buttonName="γ­γ°γ€γ³"
          buttonState={buttonState}
        />
        <Spacer />
        <SecondaryButton
          buttonName="ζ°θ¦η»ι²γ―γγ‘γ"
          type="button"
          buttonState={buttonState}
          onClick={() => setMode('SignUp')}
        />
        <SecondaryButton
          buttonName="γγΉγ―γΌγγεΏγγζΉγ―γγ‘γ"
          type="button"
          buttonState={buttonState}
          onClick={() => setMode('ResetPassword')}
        />
      </Card>
    </Stack>
  );
});

SignIn.displayName = 'SignIn';
