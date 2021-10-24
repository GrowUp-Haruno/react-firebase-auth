import { ChangeEventHandler, useCallback } from 'react';

// inputタグonChangeのハンドラ
export const useHandleChangeState = <T,>(
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const handleChangeState = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setState({ ...state, [`${event.target.id}`]: event.target.value });
    },
    [setState, state]
  );
  return { handleChangeState };
};
