import { FirebaseError } from 'firebase/app';
import { Dispatch, FormEventHandler, SetStateAction, useCallback } from 'react';

/** 
 * formタグのonSubmitイベントハンドラ
 * 
 * @return [handleSubmit] - 変数名変更可能
 * @argument  (initialState, setFormInput, setButton, callback, callbackArgs)
 */
export const useHandleSubmit = <T,>(
  initialState: T,
  setFormInput: Dispatch<SetStateAction<T>>,
  setButton: Dispatch<SetStateAction<boolean>>,
  callback: (arg: T) => Promise<void>,
  callbackArgs: T
) => {
  // 入力フォームのイベントハンドラ
  const handleSubmit = useCallback<FormEventHandler<HTMLDivElement>>(
    // const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      try {
        // 入力フォームのデフォルト動作を停止
        event.preventDefault();

        // 処理が完了するまでの、送信ボタンを押せなくする処理
        setButton(true);

        // コールバック
        await callback(callbackArgs);
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
        setButton(false);

        // フォームの入力状態を初期化
        setFormInput(initialState);
      }
    },
    [setButton, callback, callbackArgs, setFormInput, initialState]
  );
  return { handleSubmit };
};
