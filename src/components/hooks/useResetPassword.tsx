import { useForm } from '../../interface/hooks/useForm';
import { ResetUserType, useResetPasswordTypes } from '../types/typeResetPassword';
import { useFirebase } from './useFirebase';

export const useResetPassword: useResetPasswordTypes<ResetUserType> = () => {
  const {
    inputValueState,
    buttonState,
    handleChangeObjectState,
    handleSubmit,
  } = useForm<ResetUserType>({ email: '' }, useFirebase().resetPassword);

  return { inputValueState, buttonState, handleChangeObjectState, handleSubmit };
};
