import { useMemo, useState } from 'react';

import { AcountUserTypes, useSignUpTypes } from '../types/typeSignup';
import { useHandleChangeState, useHandleSubmitFirebaseCreateUser } from './useHandler';

export const useSignUp: useSignUpTypes = () => {
  const initialSignupUser = useMemo<AcountUserTypes>(() => {
    return { email: '', password: '' };
  }, []);
  const [signupUser, setSignupUser] = useState<AcountUserTypes>(initialSignupUser);
  const [isButtonDesable, setIsButtonDesable] = useState<boolean>(false);

  const { handleChangeState } = useHandleChangeState<AcountUserTypes>(
    signupUser,
    setSignupUser
  );

  // アカウント登録フォームのイベントハンドラ
  // フォームの情報(signupUser)をFirebase Authenticaitonへ送信
  //
  const { handleSubmitFirebaseCreateUser } = useHandleSubmitFirebaseCreateUser(
    initialSignupUser,
    signupUser,
    setSignupUser,
    setIsButtonDesable,
  );

  return { signupUser, isButtonDesable, handleChangeState, handleSubmitFirebaseCreateUser };
};
