下記のコードでValueイベントを監視しています。
```tsx
  useEffect(() => {
    const rootRef = ref(database);
    const messagesRef = child(rootRef, 'messages');
    const messagesQuery = query(
      messagesRef,
      orderByChild('category'),
      equalTo(category),
      limitToLast(100)
    );

    const Unsubscribe = onValue(
      messagesQuery,
      (snapshot) => {
        console.log(snapshot.val());
      }
    );

    return () =>  Unsubscribe();
  }, []);

```

下記２通りのコードを試すと、返ってくるValueイベントのsnapshot.val()の結果が異なります。


下記のコードはsnapshot.val()はValueイベント設定したクエリの結果が返ります。
```tsx
  const rootRef = ref(database);
  const messagesRef = child(rootRef, 'messages');
  const messagesQuery = query(messagesRef, orderByChild('uid'), equalTo(auth.currentUser?.uid));
  const snapshot = await new Promise<DataSnapshot>((res) =>
    onValue(messagesQuery, res, { onlyOnce: true })
  );
  
  if (snapshot.val()) {
    Object.keys(snapshot.val()).forEach((key) => {
      updates[`${key}`] = {
        ...snapshot.val()[key],
        displayName: 'New Name',
      };
    });
    await update(messagesRef, updates);
  }
```

下記のコードはsnapshot.val()はhandleChange内で設定したクエリの結果が返ります
```tsx
const handleChange = async () => {
  const rootRef = ref(database);
  const messagesRef = child(rootRef, 'messages');
  const messagesQuery = query(messagesRef, orderByChild('uid'), equalTo(auth.currentUser?.uid));
  const snapshot = await get(messagesQuery);
  
  if (snapshot.val()) {
    Object.keys(snapshot.val()).forEach((key) => {
      updates[`${key}`] = {
        ...snapshot.val()[key],
        displayName: 'New Name',
      };
    });
    await update(messagesRef, updates);
  }
}
```