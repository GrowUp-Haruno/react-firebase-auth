## はじめに
Firebase Realtime Databaseを扱うためのSDK（JavaScript用 version9）に関する資料があまり見当たらなかったため、本記事では参考資料の公式動画を基に、一般的なSQLのクエリに対するSDKでのクエリの書き方をまとめました。

## SQLの場合

まずは一般的なSQLのクエリを見ていきます。

Users テーブル

| UID | Name | Email | Age | Location |
| --- | --- | --- | --- | --- |
| 1 | satoh | satoh@example.com | 20 | osaka |
| 9 | tanaka | tanaka@example.com | 52 | tokyo |

1. UID=1のユーザーを取得

```sql
SELECT * FROM Users WHERE UID = 1;
```

2. Email列から"tanaka@example.com"を含むユーザーを取得

```sql
SELECT * FROM Users WHERE Email = "tanaka@example.com";
```

3. 選択するユーザーを10人に制限

```sql
SELECT * FROM Users LIMIT 10;
```

4. "s"から始まるユーザーを取得

```sql
SELECT * FROM Users WHERE Name LIKE "s%";
```

5. 50歳未満のユーザーを取得

```sql
SELECT * FROM Users WHERE Age < 50;
```

6. 50歳超過のユーザーを取得

```sql
SELECT * FROM Users WHERE Age > 50;
```

7. 20歳から100歳までのユーザーを取得

```sql
SELECT * FROM Users WHERE Age >= 20 && Age <= 100;
```

8. 東京都在住の52歳のユーザーを取得

```sql
SELECT * FROM Users WHERE Location = "tokyo" && Age = 52;
```


## Firebase SDK（JavaScript version9)の場合

Firebase Realtime Databaseで上記のUsersテーブルを表現するには次のようになります。

```json
{
"Users": {
"1": {
  "Name": "satoh",
  "Email": "satoh@example.com",
  "Age": 20,
  "Location": "osaka",
  "Location_Age": "osaka_20"
},
"9": {
  "Name": "tanaka",
  "Email": "tanaka@example.com",
  "Age": 52,
  "Location": "tokyo",
  "Location_Age": "tokyo_52"
}
}
}
```

まず準備として、Firebase SDKでデータベースを初期化します。

```tsx
const firebaseConfig: FirebaseOptions = {
//初期化設定
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
```

次にデータベースのrootとUsersの参照を宣言します。

```tsx
// Root Reference
const rootRef = ref(database)

// Users Root Reference
const usersRef = child(rootRef, "Users")
```
各参照先は次のようになります。
![スクリーンショット 2021-11-26 21.34.10.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/890567/ccc56ccd-6d3c-8587-32a3-ff6f61f3bc4b.png)

これで準備が完了したので、先程の1~8のクエリを書き換えていきます。

1. UID=1のユーザーを取得

```tsx
// SELECT * FROM Users WHERE UID = 1;

// Firebase SDK Ver.8
// const oneRef = rootRef.child("child").child("1")

// Firebase SDK Ver.9
const oneRef = child(rootRef, "Users/1");
// または
// const oneRef = child(usersRef, "1");
```

Ver.8はメソッドチェーンが主流でしたが、Ver.9からは引数で指定する形に変わっていることに注意してください。

oneRefを定義後、下記のコードからデータを取得できます。

```tsx
// Firebase SDK Ver.8での書き方
// oneRef.on("value", (snapshot) => console.log(snapshot.val());

// Firebase SDK Ver.9での書き方
onValue(oneRef, (snapshot) => console.log(snapshot.val()));
```

2. Email列から"tanaka@example.com"を含むユーザーを取得

```tsx
// SELECT * FROM Users WHERE Email = "tanaka@example.com";
const twoRef = query(usersRef, orderByChild("Email"), equalTo("tanaka@example.com"));
```
UID以外のネストされた各ユーザーのkeyを検索する場合、query関数とorder関数やフィルタリング関数を用います。
query関数の第1引数にUsersの参照先、第2引数以降はorder関数やフィルタリング関数を入れます。（第２引数以降は入れた順番に処理が実行されます。）
注意しないといけないのは**「1つのqueryに対して指定できるorder関数は1つまで」**という制約があります。
order関数を2つ以上入れると、データ取得時にエラーが返ってきます。
上記のコードは、「各ユーザーのEmailキーに"tanaka@example.com"が含まれるユーザーを取得」するためのクエリとなります。

3. 選択するユーザーを10人に制限

```tsx
//SELECT * FROM Users LIMIT 10;
const threeRef = query(usersRef, orderByKey(), limitToFirest(10));

// orderByKey()は省略可能のため、下記でも可能
const threeRef = query(usersRef, limitToFirst(10));
```
フィルタリング関数のlimitToFirestを用います。
引数に入れた数値分のデータを取得します。

4. "s"から始まるユーザーを取得

```tsx
// SELECT * FROM Users WHERE Name LIKE "s%";
const fourRef = query(usersRef, orderByChild("Name"), startAt("s"), endAt("s\uf8ff"));
```
フィルタリング関数のstartAtとendAtを用います。
order関数と違い、フィルタリング関数は複数入れることができます。
endAt("s\uf8ff"))でワイルドカードを再現しています。

5. 50歳未満のユーザーを取得

```tsx
// SELECT * FROM Users WHERE Age < 50;
const fiveRef = query(usersRef, orderByChild("Age"), endBefore(50));
```
〇〇未満はendBefore 、〇〇以下はendAtを用います。

6. 50歳超過のユーザーを取得

```tsx
// SELECT * FROM Users WHERE Age > 50;
const sixRef = query(usersRef, orderByChild("Age"), startAt(51));
```
〇〇超過はstartAfter、〇〇以上はstartAtを用います。

7. 20歳から100歳までのユーザーを取得

```tsx
// SELECT * FROM Users WHERE Age <= 20 && Age >= 100;
const sevenRef = query(usersRef, orderByChild("Age"), startAt(20), endAt(100));
```

8. 東京都在住の52歳のユーザーを取得

```tsx
// SELECT * FROM Users WHERE Location = "tokyo" && Age = 52;
// 注意: このクエリでデータを取得しようとするとエラーが返ります
const eightRef = query(usersRef, orderByChild("Location"), equalTo("tokyo"), 
                                orderByChild("Age"), equalTo(52));
```
ただし、このクエリでデータを取得しようとするとエラーが返ります。
これは2.で述べた**「1つのqueryに対して指定できるorder関数は1つまで」**という制約があるためです。
この制約を守りつつ検索するには、データ構造を検索できる形に最適化する必要があります。
つまり、order関数が1つしか使えないのなら、検索対象を1つにまとめてデータベースに追加すれば良いのです。

```json
{
  "Users": {
    "1": {
      "Name": "satoh",
      "Email": "satoh@example.com",
      "Age": 20,
      "Location": "osaka",
      "Location_Age": "osaka_20"
    },
    "9": {
      "Name": "tanaka",
      "Email": "tanaka@example.com",
      "Age": 52,
      "Location": "tokyo",
      "Location_Age": "tokyo_52"
    }
  }
}
```
"Location_Age"を追加しました。
この状態で、クエリを修正します。

```tsx
// SELECT * FROM Users WHERE Location = "tokyo" && Age = 52;
const eightRef = query(usersRef, orderByChild("Location_Age"), equalTo("tokyo_52"))
```
これで、UID=9のデータを取得できます。

## まとめ

- WHERE句やLIMIT句はFirebase SDKの関数ベースで再現できます。
- Firebase SDK Ver.9はVer.8から破壊的変更がされており、Ver.8メソッドチェーンが主流だったのに対して、Ver.9からは引数で指定する形に変わっているため注意が必要です。
- 1つのクエリに対して指定できるorder関数は1つまでとなっているため、検索できるようにデータ構造を最適化または設計段階で検索方法を検討した上で構築する必要があります。

## 参考資料

https://firebase.google.com/docs/database/video-series?hl=ja#sql-firebase-realtime-database

https://youtu.be/sKFLI5FOOHs