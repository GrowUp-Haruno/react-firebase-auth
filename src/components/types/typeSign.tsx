import { ChangeEventHandler, FormEventHandler } from 'react';

export type AcountUserTypes = { email: string; password: string };

export type useSignUpTypes = () => {
  signUpUser: AcountUserTypes;
  isDesable: boolean;
  handleChangeObjectState: ChangeEventHandler<HTMLInputElement>;
  handleSubmitToFirebase: FormEventHandler<HTMLFormElement>;
};

export type useSignInTypes = () => {
  signInUser: AcountUserTypes;
  isDesable: boolean;
  handleChangeObjectState: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmitToFirebase: React.FormEventHandler<HTMLFormElement>;
};