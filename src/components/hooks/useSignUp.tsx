import { useMemo, useState } from 'react';

import { AcountUserTypes, useSignUpTypes } from '../types/typeSignup';
import { useHandleChangeObjectState, useHandleSubmitFirebaseCreateUser } from './useHandler';

export const useSignUp: useSignUpTypes = () => {
  const initialSignupUser = useMemo<AcountUserTypes>(() => {
    return { email: '', password: '' };
  }, []);
  const [signupUser, setSignupUser] = useState<AcountUserTypes>(initialSignupUser);
  const [isButtonDesable, setIsButtonDesable] = useState<boolean>(false);

  const { handleChangeObjectState } = useHandleChangeObjectState<AcountUserTypes>(
    signupUser,
    setSignupUser
  );

  const { handleSubmitFirebaseCreateUser } = useHandleSubmitFirebaseCreateUser(
    initialSignupUser,
    signupUser,
    setSignupUser,
    setIsButtonDesable,
  );

  return { signupUser, isButtonDesable, handleChangeObjectState, handleSubmitFirebaseCreateUser };
};
