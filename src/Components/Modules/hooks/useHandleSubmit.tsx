import { FirebaseError } from 'firebase/app';
import { Dispatch, FormEventHandler, SetStateAction, useCallback, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useFirebaseErrors } from './useFirebaseErrors';
/**
 * formタグのonSubmitイベントハンドラを生成する
 *
 * @return [handleSubmit] - 変数名変更可能
 * @argument  (initialState, setFormInput, setButton, callback, callbackArgs)
 *  * ### 引数
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
export const useHandleSubmit = <T,>(
  initialState: T,
  setFormInput: Dispatch<SetStateAction<T>>,
  setButton: Dispatch<SetStateAction<boolean>>,
  callback: (arg: T) => Promise<void>,
  callbackArgs: T
) => {
  // エラー表示用のToast
  const toast = useToast();
  const { FirebaseErrors } = useFirebaseErrors();
  
  useEffect(() => {
    
    return () => {
      // 送信ボタンが押せるようにする
      setButton(false);
    }
  }, [ setButton ])

  // 入力フォームのイベントハンドラ
  const handleSubmit: FormEventHandler<HTMLDivElement> = useCallback<FormEventHandler<HTMLDivElement>>(
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
          if (FirebaseErrors[`${error.code}`] !== undefined) {
            // Firebaseの非同期APIのエラーを表示
            toast({
              title: FirebaseErrors[`${error.code}`].title,
              description: FirebaseErrors[`${error.code}`].description,
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: '予期しないエラー',
              description: '予期しないエラーが発生しました',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
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
    [setButton, callback, callbackArgs, toast, FirebaseErrors, setFormInput, initialState]
  );
  return { handleSubmit };
};
