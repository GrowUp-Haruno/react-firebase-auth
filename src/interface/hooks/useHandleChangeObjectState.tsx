import { ChangeEventHandler, Dispatch, SetStateAction, useCallback } from 'react';

/**
 * inputタグonChangeのハンドラ(objectステート版)
 * @return handleChangeObjectState
 * @argument inputValueState,SetInputValueState
 */

export const useHandleChangeObjectState = <T,>(
  inputValueState: T,
  setInputValueState: Dispatch<SetStateAction<T>>
):  ChangeEventHandler<HTMLInputElement>  => {
  const handleChangeObjectState = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setInputValueState({ ...inputValueState, [`${event.target.name}`]: event.target.value });
  }, [inputValueState, setInputValueState]);
  return handleChangeObjectState;
};
