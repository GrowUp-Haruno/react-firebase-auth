import { useSignInTypes } from '../types/typeSign';
import { useFirebase } from './useFirebase';
import { useHandleSubmitToFirebase } from './useHandleSubmitToFirebase';
import { useSign } from './useSign';

export const useSignIn:useSignInTypes = () => {
  // フォームの基本フックを読み込み
  const [
    initialSignInUser,
    signInUser,
    setSignInUser,
    isDesable,
    setIsDesable,
    handleChangeObjectState,
  ] = useSign();

  const { handleSubmitToFirebase } = useHandleSubmitToFirebase(
    initialSignInUser,
    setSignInUser,
    setIsDesable,
    useFirebase().signIn,
    signInUser
  );

  return { signInUser, isDesable, handleChangeObjectState, handleSubmitToFirebase };
};
