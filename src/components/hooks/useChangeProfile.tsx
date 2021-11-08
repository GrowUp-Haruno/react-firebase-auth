import { useForm } from '../../interface/hooks/useForm';
import { ChangeUserProfileTypes } from '../types/typeChangeUserProfile';
import { useFirebase } from './useFirebase';

export const useChangeProfile = () => {
  const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } =
    useForm<ChangeUserProfileTypes>(
      { userName: '', photoUrl: '' },
      useFirebase().changeUserProfile
    );

  return { inputValueState, buttonState, handleChangeObjectState, handleSubmit };
};
