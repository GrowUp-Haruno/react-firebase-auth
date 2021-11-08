import { ChangeEventHandler, FormEventHandler } from 'react';

export type AcountUserTypes = { email: string; password: string };

// ユーザー定義型ガード(AcountUser)
export function isAcountUserTypes(arg: any): arg is AcountUserTypes {
  return arg.email !== undefined;
}

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
