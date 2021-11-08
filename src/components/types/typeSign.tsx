import { ChangeEventHandler, FormEventHandler } from 'react';
export type AcountUserTypes = { email: string; password: string };
export type ChangeUserProfileTypes = { userName: string; phoneNumber: string };

// ユーザー定義型ガード(AcountUser)
export function isAcountUserTypes(arg: any): arg is AcountUserTypes {
  return arg.email !== undefined;
}

export type useSignUpTypes = () => {
  inputValueState: AcountUserTypes;
  buttonState: boolean;
  handleChangeObjectState: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export type useSignInTypes = () => {
  inputValueState: AcountUserTypes;
  buttonState: boolean;
  handleChangeObjectState: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};
