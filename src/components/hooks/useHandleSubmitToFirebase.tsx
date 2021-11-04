import { FirebaseError } from 'firebase/app';
import { Dispatch, FormEventHandler, SetStateAction, useCallback } from 'react';

export const useHandleSubmitToFirebase = <T,>(
  initialState: T,
  setSignUser: Dispatch<SetStateAction<T>>,
  setIsButtonDesable: Dispatch<SetStateAction<boolean>>,
  firebaseFunction: (arg: T) => Promise<void>,
  callbackArgs: T
) => {
  // 入力フォームのイベントハンドラ
  const handleSubmitToFirebase = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      try {
        // 入力フォームのデフォルト動作を停止
        event.preventDefault();

        // 処理が完了するまでの、送信ボタンを押せなくする処理
        setIsButtonDesable(true);

        // コールバック
        await firebaseFunction(callbackArgs);
      } catch (error) {
        if (error instanceof FirebaseError) {
          // Firebaseの非同期APIのエラーを表示
          console.log(error.code);
        } else {
          // その他の非同期関数のエラー表示
          console.log(error);
        }
      } finally {
        // 送信ボタンが押せるようにする
        setIsButtonDesable(false);

        // フォームの入力状態を初期化
        setSignUser(initialState);
      }
    },
    [setIsButtonDesable, firebaseFunction, callbackArgs, setSignUser, initialState]
  );
  return { handleSubmitToFirebase };
};
