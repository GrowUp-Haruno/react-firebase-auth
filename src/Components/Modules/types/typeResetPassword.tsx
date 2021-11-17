import { ChangeEventHandler, FormEventHandler } from 'react';

export type ResetUserType = { email: string };
export type useResetPasswordTypes<T> = () => {
  inputValueState: T;
  buttonState: boolean;
  handleChangeObjectState: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLDivElement>;
};
