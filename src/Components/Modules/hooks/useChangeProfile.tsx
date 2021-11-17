import { useForm } from './useForm';
import { ChangeUserProfileTypes } from '../types/typeChangeUserProfile';
import { useFirebase } from './useFirebase';
import { auth } from '../../../firebase';

export const useChangeProfile = () => {
  const {
    inputValueState,
    buttonState,
    handleChangeObjectState,
    handleSubmit,
  } = useForm<ChangeUserProfileTypes>(
    {
      userName: auth.currentUser?.displayName ? auth.currentUser.displayName : '',
      photoUrl: auth.currentUser?.photoURL ? auth.currentUser.photoURL : '',
    },
    useFirebase().changeUserProfile
  );

  return { inputValueState, buttonState, handleChangeObjectState, handleSubmit };
};
