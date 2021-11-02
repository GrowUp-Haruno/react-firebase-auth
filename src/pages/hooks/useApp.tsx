import { onIdTokenChanged, signOut, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../../firebase';
import { useAppTypes } from '../types/typeApp';

export const useApp: useAppTypes = () => {
  const [signInUser, setSignInUser] = useState<User | null>(null);
  useEffect(() => {
    // サインイン、サインアウト、およびトークン更新イベントを含む、
    // サインインしたユーザーのIDトークンへの変更のオブザーバーを追加
    onIdTokenChanged(auth, (user: User | null) => {
      // onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // メールアドレスの認証(user.emailVerified)が取れているか確認
        if (user.emailVerified) {
          // ユーザー情報をセット
          console.log('onAuthStateChanged called');
          setSignInUser(user);
        } else {
          // サインアウト
          (async () => {
            await signOut(auth);
            console.log('メールアドレスの認証が取れていないためサインアウトしました');
          })();
        }
      } else {
        setSignInUser(null);
        console.log('user Sign out');
      }
    });
  }, []);
  return { signInUser };
};
