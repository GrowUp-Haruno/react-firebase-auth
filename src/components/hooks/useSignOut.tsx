import { signOut } from 'firebase/auth';
import { useCallback } from 'react';

import { auth } from '../../firebase';

export const useSignOut = () => {
  const handleSignOut = useCallback(async () => {
    signOut(auth);
  }, []);
  return { handleSignOut };
};
