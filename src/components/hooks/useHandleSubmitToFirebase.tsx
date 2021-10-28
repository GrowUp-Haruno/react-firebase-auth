import { FirebaseError } from 'firebase/app';
import { Dispatch, FormEventHandler, SetStateAction, useCallback } from 'react';

import { AcountUserTypes } from '../types/typeSign';

export const useHandleSubmitToFirebase = (
  
  initialSignUser: AcountUserTypes,
  setSignUser: Dispatch<SetStateAction<AcountUserTypes>>,
  setIsButtonDesable: Dispatch<SetStateAction<boolean>>,
  firebaseFunction: (email: string, password: string) => Promise<void>,
  signUser: AcountUserTypes
) => {
  // [SignUp]入力フォームのイベントハンドラ
  const handleSubmitToFirebase = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      try {
        // 入力フォームのデフォルト動作を停止
        event.preventDefault();

        // 処理が完了するまでの、送信ボタンを押せなくする処理
        setIsButtonDesable(true);

        // コールバック
        await firebaseFunction(signUser.email, signUser.password);
      } catch (error) {
        if (error instanceof FirebaseError) {
          // Firebaseの非同期APIのエラーを表示
          console.log(error.code);
        } else {
          // その他の非同期関数のエラー表示
          console.log(error);
        }
      } finally {
        // 送信ボタンが押せるようにする処理
        setIsButtonDesable(false);

        // フォームの入力状態を初期化
        setSignUser(initialSignUser);
      }
    },
    [setIsButtonDesable, firebaseFunction, signUser, setSignUser, initialSignUser]
  );
  return { handleSubmitToFirebase };
};
