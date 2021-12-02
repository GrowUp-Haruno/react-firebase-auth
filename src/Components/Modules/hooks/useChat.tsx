import { useCallback, useEffect, useState } from 'react';
import {
  child,
  equalTo,
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  update,
} from 'firebase/database';

import { updatesType, useChatInputType, useChatViewType } from '../types/typeChat';
import { database } from '../../../firebase';

/**
 * ChatViewのカスタムフック
 * @example const { snapshotVal } = useChatView(category);
 */
export const useChatView: useChatViewType = (category) => {
  const [snapshotVal, setSnapshotVal] = useState<updatesType|null>({});
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    // Realtime Databaseのルート参照の設定
    const rootRef = ref(database);
    const messagesRef = child(rootRef, 'messages');

    // queryの設定
    const messagesQuery = query(
      messagesRef,
      orderByChild('category'),
      equalTo(category),
      limitToLast(100)
    );

    // onValueのイベントリスナを登録
    const Unsubscribe = onValue(
      messagesQuery,
      (snapshot) => {
        setSnapshotVal(snapshot.val());
        console.log('読込みが完了しました');
      },
      {
        onlyOnce: false,
        // false : Databaseの更新を検知する
        // true  : 更新を検知しない(１回だけ読込む)
      }
    );
    setLoading(false)
    return () => {
      // アンマウント時にonValueのイベントリスナを削除
      console.log('アンマウント完了');
      Unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { snapshotVal ,loading};
};

/**
 * ChatInputのカスタムフック
 * @example const { tweet, setTweet, sendTweet } = useChatInput(signInUser, 'オープン');
 */
export const useChatInput: useChatInputType = (signInUser, category) => {
  // Reference setting
  const rootRef = ref(database);
  const messagesRef = child(rootRef, 'messages');

  const [tweet, setTweet] = useState<string>('');

  const sendTweet = useCallback(async () => {
    if (tweet !== '' && signInUser.displayName !== null) {
      try {
        const newChildKey = push(messagesRef).key;
        const updates: updatesType = {};

        updates[`${newChildKey}`] = {
          uid: signInUser.uid,
          displayName: signInUser.displayName,
          photoURL: signInUser.photoURL ? signInUser.photoURL : '',
          category: category,
          tweet: tweet,
        };
        await update(messagesRef, updates);
        setTweet('');
        console.log('書き込みが完了しました');
      } catch (error) {
        console.log('送信エラー');
      }
    } else {
      console.log('文字を入力してください')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInUser.displayName, signInUser.photoURL, signInUser.uid, tweet]);

  return { tweet, setTweet, sendTweet };
};
