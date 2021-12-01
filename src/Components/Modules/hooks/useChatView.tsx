import { useEffect, useState } from 'react';
import { child, equalTo, limitToLast, onValue, orderByChild, query, ref } from 'firebase/database';

import { updatesType, useChatViewType } from '../types/typeChat';
import { database } from '../../../firebase';

export const useChatView: useChatViewType = (category) => {
  const [snapshotVal, setSnapshotVal] = useState<updatesType>({});

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
    return () => {
      // アンマウント時にonValueのイベントリスナを削除
      console.log('アンマウント完了');
      Unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(snapshotVal)
  return { snapshotVal };
};
