import { FirebaseError } from '@firebase/util';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { ChangeEventHandler, FormEventHandler, useCallback } from 'react';
import { auth } from '../../firebase';
import { AcountUserTypes } from '../types/typeSignup';

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

export const useHandleSubmitFirebaseCreateUser = (
  initialSignupUser: AcountUserTypes,
  signupUser: AcountUserTypes,
  setSignupUser: React.Dispatch<React.SetStateAction<AcountUserTypes>>,
  setIsButtonDesable: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // [SignUp]入力フォームのイベントハンドラ
  const handleSubmitFirebaseCreateUser = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      try {
        // 入力フォームのデフォルト動作を停止
        event.preventDefault();
        
        // 入力フォームの内容を各変数に分割代入
        const { email, password } = signupUser;
  
        // 処理が完了するまでの、送信ボタンを押せなくする処理
        setIsButtonDesable(true);

        // 入力フォームの内容をFirebaseに送信して、ユーザーを登録する
        // 成功した場合、ログイン状態となりユーザー情報を取得する
        const UserCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Firebase AuthenticationのcreateUserWithEmailAndPassword()はメールアドレスの被りや
        // パスワードが不適切などの理由を除いていくらでもユーザー登録ができて、ログインもできてしまう仕様のため、
        // 次の2つの対策を実装する

        // 1. ユーザー確認メールを送信
        // 登録メールアドレスにユーザー確認のメールを送付し、メールのリンクを踏むと登録ユーザーが有効になる
        await sendEmailVerification(UserCredential.user);

        // 2. 強制的にサインアウト
        await signOut(auth);
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
        setSignupUser(initialSignupUser);
      }
    },
    [initialSignupUser, setIsButtonDesable, setSignupUser, signupUser]
  );
  return { handleSubmitFirebaseCreateUser };
};
