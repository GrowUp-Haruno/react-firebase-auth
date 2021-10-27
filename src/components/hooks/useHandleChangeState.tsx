import { ChangeEventHandler, useCallback } from 'react';

// inputタグonChangeのハンドラ(objectステート版)
export const useHandleChangeObjectState = <T,>(
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const handleChangeObjectState = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setState({ ...state, [`${event.target.id}`]: event.target.value });
    },
    [setState, state]
  );
  return { handleChangeObjectState };
};
