import { FirebaseError } from '@firebase/util';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ChangeEventHandler, FormEventHandler, useCallback } from 'react';
import { auth } from '../../firebase';
import { AcountUserTypes } from '../types/typeSignup';

// inputタグonChangeのハンドラ
export const useHandleChangeState = <T,>(
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const handleChangeState = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setState({ ...state, [`${event.target.id}`]: event.target.value });
    },
    [setState, state]
  );
  return { handleChangeState };
};

export const useHandleSubmitFirebaseCreateUser = (
  initialSignupUser: AcountUserTypes,
  signupUser: AcountUserTypes,
  setSignupUser: React.Dispatch<React.SetStateAction<AcountUserTypes>>,
  setIsButtonDesable: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleSubmitFirebaseCreateUser = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      const { email, password } = signupUser;
      event.preventDefault();
      setIsButtonDesable(true);
      try {
        const UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(UserCredential)
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
    [initialSignupUser, setIsButtonDesable, setSignupUser, signupUser]
  );
  return { handleSubmitFirebaseCreateUser };
};
