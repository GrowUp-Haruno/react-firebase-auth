import { useForm } from './useForm';
import { AcountUserTypes, useSignInTypes } from '../types/typeSign';
import { useFirebase } from './useFirebase';

export const useSignIn: useSignInTypes = () => {
  const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } =
    useForm<AcountUserTypes>({ email: '', password: '' }, useFirebase().signIn);

  return { inputValueState, buttonState, handleChangeObjectState, handleSubmit };
};
