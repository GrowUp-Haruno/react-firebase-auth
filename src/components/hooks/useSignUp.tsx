import { useSignUpTypes } from '../types/typeSign';
import { useFirebase } from './useFirebase';
import { useHandleSubmitToFirebase } from './useHandleSubmitToFirebase';
import { useSign } from './useSign';

export const useSignUp: useSignUpTypes = () => {
  // フォームの基本フックを読み込み
  const [
    initialSignUpUser,
    signUpUser,
    setSignUpUser,
    isDesable,
    setIsDesable,
    handleChangeObjectState,
  ] = useSign();

  const { handleSubmitToFirebase } = useHandleSubmitToFirebase(
    initialSignUpUser,
    setSignUpUser,
    setIsDesable,
    useFirebase().signUp,
    signUpUser,
  );
  return { signUpUser, isDesable, handleChangeObjectState, handleSubmitToFirebase };
};
