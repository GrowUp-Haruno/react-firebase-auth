import { useMemo, useState } from 'react';

import { AcountUserTypes } from '../types/typeSign';
import { useHandleChangeObjectState } from './useHandleChangeState';

type useSignTypes = () => [
  initialSignUser: AcountUserTypes,
  signUser: AcountUserTypes,
  setSignUser: React.Dispatch<React.SetStateAction<AcountUserTypes>>,
  isDesable: boolean,
  setIsDesable: React.Dispatch<React.SetStateAction<boolean>>,
  handleChangeObjectState: React.ChangeEventHandler<HTMLInputElement>
];

export const useSign: useSignTypes = () => {
  const initialSignUser = useMemo<AcountUserTypes>(() => {
    return { email: '', password: '' };
  }, []);
  const [signUser, setSignUser] = useState<AcountUserTypes>(initialSignUser);

  const [isDesable, setIsDesable] = useState<boolean>(false);

  const { handleChangeObjectState } = useHandleChangeObjectState<AcountUserTypes>(
    signUser,
    setSignUser
  );

  return [initialSignUser, signUser, setSignUser, isDesable, setIsDesable, handleChangeObjectState];
};
