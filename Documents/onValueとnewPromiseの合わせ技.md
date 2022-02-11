```tsx
await new Promise<void>((resolve, reject) => {
  onValue(
    usersQuery,
    (snapshot) => {
      if (snapshot.val()) {
        if (
          snapshot.val().updateCount < numberOfLimits ||
          snapshot.val().lastUpdate + updateInterval * 60 * 1000 < new Date().getTime()
        ) {
          if (
            snapshot.val().lastUpdate + updateInterval * 60 * 1000 <
            new Date().getTime()
          ) {
            usersUpdates[signInUser.uid] = {
              lastUpdate: serverTimestamp(),
              updateCount: 1,
            };
            resolve();
          } else {
            usersUpdates[signInUser.uid] = {
              lastUpdate: serverTimestamp(),
              updateCount: snapshot.val().updateCount + 1,
            };
            resolve();
          }
        }
        // 更新条件の規定値を超えた場合、FirebaseErrorを返す
        else {
          reject(new FirebaseError('changeProfile-error', ''));
        }
      } else {
        // プロフィール初変更
        usersUpdates[signInUser.uid] = { lastUpdate: serverTimestamp(), updateCount: 1 };
        resolve();
      }
    },
    { onlyOnce: true }
  );
});
```