import { updateCurrentUser, updateProfile, User } from 'firebase/auth';
import { useCallback } from 'react';
import { auth } from '../../firebase';

type useChangeProfileTypes = (signInUser: User) => {
  handleChangeProfile: React.FormEventHandler<HTMLFormElement>;
};

export const useChangeProfile: useChangeProfileTypes = (signInUser) => {
  const handleChangeProfile = useCallback<React.FormEventHandler<HTMLFormElement>>(async () => {
    await updateProfile(signInUser, {
      displayName: `${signInUser.displayName}a`,
      photoURL: 'test',
    });
    await updateCurrentUser(auth, signInUser);
  }, [signInUser]);
  return { handleChangeProfile };
};
