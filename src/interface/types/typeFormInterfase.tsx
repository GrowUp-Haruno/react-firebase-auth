import { ChangeEventHandler, FormEventHandler, HTMLInputTypeAttribute } from 'react';

export type inputPartsType<T> = {
  labelName: string | undefined;
  nowSetting: string | null | undefined;
  inputName: Extract<keyof T, string>;
  inputType: HTMLInputTypeAttribute | undefined;
  inputPlaceholder: string | undefined;
};

export type FormInterfasePropTypes<T> = {
  /** 入力フォームタイトル */
  formTitle: string | undefined;

  /** 各inputタグの入力状態*/
  inputValueState: T;

  /** 各インプットタグの */
  inputParts: Array<inputPartsType<T>>;

  /** 入力フォームの送信イベント */
  handleSubmit: FormEventHandler<HTMLFormElement>;

  /** 入力ボックスの変化イベント */
  handleChange: ChangeEventHandler<HTMLInputElement>;

  /** 送信ボタン名 */
  buttonName: string;

  /** ボタンの有効無効切り替え */
  buttonDesable: boolean;
};

/** 入力フォームのインデックスシグネチャ */
export type inputValueTypes = { [key: string]: string | number | readonly string[] | undefined };
