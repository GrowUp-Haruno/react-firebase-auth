import { ChangeEventHandler, FormEventHandler, HTMLInputTypeAttribute } from 'react';

export type FormInputTypes<T> = {
  /** インプットのラベル名: string */
  labelName: string;

  /**  現在の設定値: string */
  nowSetting?: string | null | undefined;

  /** inputのname属性: string */
  inputName: Extract<keyof T, string>;

  /** inputのname属性: HTMLInputTypeAttribute */
  inputType: HTMLInputTypeAttribute | undefined;

  /** inputのプレースホルダー: string */
  inputPlaceholder: string | undefined;
};

export type FormInterfasePropTypes<T> = {
  /** 入力フォームタイトル */
  formTitle: string | undefined;

  /** 各inputタグの入力状態*/
  inputValueState: T;

  /** 各インプットタグの */
  inputParts: Array<FormInputTypes<T>>;

  /** 入力フォームの送信イベント */
  handleSubmit: FormEventHandler<HTMLFormElement>;

  /** 入力ボックスの変化イベント */
  handleChange: ChangeEventHandler<HTMLInputElement>;

  /** 送信ボタン名 */
  buttonName: string;

  /** ボタンの有効無効切り替え */
  buttonState: boolean;
};

/** 入力フォームのインデックスシグネチャ */
export type FormInputValueTypes = {
  [key: string]: string | number | readonly string[] | undefined;
};
