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
 * ## 入力フォーム向けのカスタムフック
 * フォームに複数のinputを動的生成するためのフックを返します
 * 
 * ### 使用例
 * ```tsx
 * const { inputValueState, buttonState, handleChangeObjectState, handleSubmit } = useForm<T>{    
 *    { userName: '', photoUrl: ''}, callback()
 * }
 * ```
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
  // inputの入力フック
  const [inputValueState, setInputValueState] = useState<T>(formInputInitial);

  // buttonの押下有効無効フック
  const [buttonState, setButtonState] = useState<boolean>(false);

  /** form 入力イベントのハンドラ */
  const handleChangeObjectState = useHandleChangeObjectState<T>(
    inputValueState,
    setInputValueState
  );

  const { handleSubmit } = useHandleSubmit<T>(
    formInputInitial,
    setInputValueState,
    setButtonState,
    callback,
    inputValueState
  );

  return { inputValueState, buttonState, handleChangeObjectState, handleSubmit };
};
