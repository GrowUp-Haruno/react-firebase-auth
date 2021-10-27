import { FirebaseError } from 'firebase/app';
import { useCallback } from 'react';

import { AcountUserTypes } from '../types/typeSign';

export const useHandleSubmitToFirebase = (
  initialSignUser: AcountUserTypes,
  setSignUser: React.Dispatch<React.SetStateAction<AcountUserTypes>>,
  setIsButtonDesable: React.Dispatch<React.SetStateAction<boolean>>,
  firebaseFunction: () => Promise<void>
) => {
  // [SignUp]入力フォームのイベントハンドラ
  const handleSubmitToFirebase = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (event) => {
      try {
        // 入力フォームのデフォルト動作を停止
        event.preventDefault();

        // 処理が完了するまでの、送信ボタンを押せなくする処理
        setIsButtonDesable(true);

        // コールバック
        await firebaseFunction();
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
    [initialSignUser, setIsButtonDesable, setSignUser, firebaseFunction]
  );
  return { handleSubmitToFirebase };
};
