import { createUserWithEmailAndPassword } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { ChangeEventHandler, FormEventHandler, useCallback, useMemo, useState } from 'react';

import { auth } from '../../firebase';
import { useHandleChangeState } from './useHandler';

type AcountUserTypes = { email: string; password: string };
type useSignUpTypes = () => {
  signupUser: AcountUserTypes;
  isButtonDesable: boolean;
  handleChangeState: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const useSignUp: useSignUpTypes = () => {
  const initialSignupUser = useMemo<AcountUserTypes>(() => {
    return { email: '', password: '' };
  }, []);
  const [signupUser, setSignupUser] = useState<AcountUserTypes>(initialSignupUser);
  const [isButtonDesable, setIsButtonDesable] = useState<boolean>(false);

  const { handleChangeState } = useHandleChangeState<AcountUserTypes>(signupUser, setSignupUser);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      const { email, password } = signupUser;
      event.preventDefault();
      setIsButtonDesable(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // const UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.log(error.code);
        } else {
          console.log(error);
        }
      } finally {
        setIsButtonDesable(false);
        setSignupUser(initialSignupUser);
      }
    },
    [initialSignupUser, signupUser]
  );

  return { signupUser, isButtonDesable, handleChangeState, handleSubmit };
};
