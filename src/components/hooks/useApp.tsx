import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../../firebase';
import { useAppTypes } from '../types/typeApp';

export const useApp: useAppTypes = () => {
  const [signInUser, setSignInUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setSignInUser(user);
      } else {
        console.log('user Sign out');
      }
    });
  }, []);
  return { signInUser, setSignInUser };
};
