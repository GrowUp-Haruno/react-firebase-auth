import { useForm } from '../../interface/hooks/useForm';
import { AcountUserTypes, useSignUpTypes } from '../types/typeSign';
import { useFirebase } from './useFirebase';

export const useSignUp: useSignUpTypes = () => {
  const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } =
    useForm<AcountUserTypes>({ email: '', password: '' }, useFirebase().signUp);

  return { inputValueState, buttonState, handleChangeObjectState, handleSubmit };
};
