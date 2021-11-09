import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import { useCallback } from 'react';

import { auth } from '../../firebase';
// import { AcountUserTypes } from '../types/typeSign';

import { changeUserProfileTypes, signTypes, useFirebaseTypes } from '../types/typeUseFirebase';

export const useFirebase: useFirebaseTypes = () => {
  /** ユーザー登録 */
  const signUp: signTypes = useCallback(async (arg) => {
    // 入力フに送信して、ユーザーを登録する
    // 成功した場合、ログイン状態となりユーザー情報を取得する
    const UserCredential = await createUserWithEmailAndPassword(auth, arg.email, arg.password);

    // Firebase AuthenticationのcreateUserWithEmailAndPassword()はメールアドレスの被りや
    // パスワードが不適切などの理由を除いていくらでもユーザー登録ができて、ログインもできてしまう仕様のため、
    // 次の2つの対策を実装する
    // 1. ユーザー確認メールを送信
    // 登録メールアドレスにユーザー確認のメールを送付し、メールのリンクを踏むと登録ユーザーが有効になる
    await sendEmailVerification(UserCredential.user);

    // 2. 強制的にサインアウト
    await signOut(auth);
  }, []);

  /** サインイン */
  const signIn: signTypes = useCallback(async (arg) => {
    await signInWithEmailAndPassword(auth, arg.email, arg.password);
  }, []);

  /** サインアウト */
  const userSignOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  /** ユーザープロファイル更新 */
  const changeUserProfile:changeUserProfileTypes = useCallback(async (arg) => {
    if (auth.currentUser !== null) {
      await updateProfile(auth.currentUser, {
        displayName: `${arg.userName}`,
        photoURL: `${arg.photoUrl}`,
      });
      await updateCurrentUser(auth, auth.currentUser);
    }
  }, []);

  return { signUp, signIn, userSignOut, changeUserProfile };
};
