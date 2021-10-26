import { ChangeEventHandler, FormEventHandler } from 'react';

export type AcountUserTypes = { email: string; password: string };

export type useSignUpTypes = () => {
  signupUser: AcountUserTypes;
  isButtonDesable: boolean;
  handleChangeObjectState: ChangeEventHandler<HTMLInputElement>;
  handleSubmitFirebaseCreateUser: FormEventHandler<HTMLFormElement>;
};
