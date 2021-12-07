// node_module import
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
// user_module import
import { FormInputValueTypes } from '../types/typeFormInterfase';
import { useHandleChangeObjectState } from './useHandleChangeObjectState';
import { useHandleSubmit } from './useHandleSubmit';

type useFormType = <T extends FormInputValueTypes>(
  // formInputの初期化
  formInputInitial: T,
  // callback イベント処理の本体
  callback: (arg: T) => Promise<void>
) => {
  inputValueState: T;
  buttonState: boolean;
  handleChangeObjectState: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLDivElement>;
};

/**
 * フォームに複数のinputを動的生成するためのフックを返します
 *
 * ### 引数
 * 1. formInputInitial: 入力フォームの名前と初期値
 * 2. callback: 送信ボタンを押した時のイベントハンドラを指定
 *
 * ### ジェネリクス
 * - T: formInputInitialに指定する型を入れてください
 *
 * ### 戻り値
 * - inputValueState: inputの入力状態
 * - buttonState: ボタンの有効無効状態
 * - handleChangeObjectState: inputのonChangeハンドラ
 * - handleSubmit: 送信ボタンのonSubmitハンドラ
 */
export const useForm: useFormType = <T extends FormInputValueTypes>(
  formInputInitial: T,
  callback: (arg: T) => Promise<void>
) => {
  // inputの入力状態を生成
  const [inputValueState, setInputValueState] = useState<T>(formInputInitial);

  // ボタンの有効無効状態を生成
  const [buttonState, setButtonState] = useState<boolean>(false);

  // 送信ボタンのonSubmitハンドラを生成
  const { handleSubmit } = useHandleSubmit<T>(
    formInputInitial,
    setInputValueState,
    setButtonState,
    callback,
    inputValueState
  );

  // form inputのonChangeハンドラを生成
  const handleChangeObjectState = useHandleChangeObjectState<T>(
    inputValueState,
    setInputValueState
  );
  return { inputValueState, buttonState, handleChangeObjectState, handleSubmit };
};
