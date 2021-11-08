// node_module import
import { ChangeEventHandler, FormEventHandler, useMemo, useState } from 'react';
// user_module import
import { FormInputValueTypes } from '../types/typeFormInterfase';
import { useHandleChangeObjectState } from './useHandleChangeState';
import { useHandleSubmit } from './useHandleSubmit';

/**
 * FormInterfase カスタムフック
 * @return inputValueState, buttonState, handleChangeObjectState, handleSubmit
 * @argument formInputInitial,callback
 */
export const useForm = <T extends FormInputValueTypes>(
  /** formInputの初期化 */
  formInputInitial: T,

  /** callback イベント処理の本体 */
  callback: (arg: T) => Promise<void>
): {
  inputValueState: T;
  buttonState: boolean;
  handleChangeObjectState: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
} => {
  /** hookFormInputの初期化用定数 */
  const initialState = useMemo<T>(() => {
    return formInputInitial;
  }, [formInputInitial]);

  /**　form inputの入力フック*/
  const [inputValueState, setInputValueState] = useState<T>(initialState);

  /** form buttonの押下有効無効フック */
  const [buttonState, setButtonState] = useState<boolean>(false);

  /** form 入力イベントのハンドラ */
  const handleChangeObjectState = useHandleChangeObjectState<T>(
    inputValueState,
    setInputValueState
  );

  const { handleSubmit } = useHandleSubmit<T>(
    initialState,
    setInputValueState,
    setButtonState,
    callback,
    inputValueState
  );

  return { inputValueState, buttonState, handleChangeObjectState, handleSubmit };
};
