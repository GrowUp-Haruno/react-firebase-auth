import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../../firebase';
import { useAppTypes } from '../types/typeApp';

export const useApp: useAppTypes = () => {
  const [signInUser, setSignInUser] = useState<User | null>(null);
  useEffect(() => {
    // ユーザーのサインイン状態の変更に対するオブザーバーを追加
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // メールアドレスの認証(user.emailVerified)が取れているか確認
        if (user.emailVerified) {
          // ユーザー情報をセット
          setSignInUser(user);
        } else {
          // サインアウト
          (async () => {
            await signOut(auth);
            console.log('メールアドレスの認証が取れていないためサインアウトしました');
          })();
        }
      } else {
        console.log('user Sign out');
      }
    });
  }, []);
  return { signInUser };
};
