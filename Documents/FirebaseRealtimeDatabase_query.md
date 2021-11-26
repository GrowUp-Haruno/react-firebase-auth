# Realtime Database

# 一般的なSQLのクエリをFirebaseデータベース用のクエリに変換

本記事はFirebase公式に
---

[https://youtu.be/sKFLI5FOOHs](https://youtu.be/sKFLI5FOOHs)

## SQLの場合

Users

| UID | Name | Email | Age | Location |
| --- | --- | --- | --- | --- |
| 1 | satoh | satoh@example.com | 20 | osaka |
| 9 | tanaka | tanaka@example.com | 52 | tokyo |

1. UIDによるユーザーの選択
    
    ```sql
    SELECT * FROM Users WHERE UID = 1;
    ```
    
2. Emailからユーザーを検索
    
    ```sql
    SELECT * FROM Users WHERE Email = "tanaka@example.com";
    ```
    
3. 選択するユーザーを10人に制限
    
    ```sql
    SELECT * FROM Users LIMIT 10;
    ```
    
4. "s"から始まる全ユーザーを取得
    
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
    

## Firebase SDKの場合

```json
	{
		"Users": {
			"1": {
				"Name": "satoh",
				"Email": "satoh@example.com",
				"Age": 20,
				"Location": "osaka"
			},
			"9": {
				"Name": "tanaka",
				"Email": "tanaka@example.com",
				"Age": 52,
				"Location": "tokyo"
			}
		}
	}
```

```tsx
const firebaseConfig: FirebaseOptions = {
	//初期化設定
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

// Root Reference
const rootRef = ref(database)

// Users Root Reference
const usersRef = child(rootRef, "Users")
```

1. UIDによるユーザーの選択
    
    ```tsx
    // SELECT * FROM Users WHERE UID = 1;
    
    // Firebase SDK Ver.8
    // const oneRef = rootRef.child("child").child("1")
    
    // Firebase SDK Ver.9
    const oneRef = child(rootRef, "Users/1");
    ```
    
    Firebase SDK Ver.8はメソッドチェーンが主流でしたが、Ver.9からは引数で指定する形に変わっています。
    
    oneRefを定義後、下記のコードからデータを取得できます。
    
    ```tsx
    // Firebase SDK Ver.8
    oneRef.on("value", (snapshot) => console.log(snapshot.val());
    
    // Firebase SDK Ver.9
    onValue(oneRef, (snapshot) => console.log(snapshot.val()));
    ```
    
    以降Ver.8は割愛します。
    
2. Emailからユーザーを検索
    
    ```tsx
    // SELECT * FROM Users WHERE Email = "tanaka@example.com";
    const twoRef = query(usersRef, orderByChild("Email"), equalTo("tanaka@example.com"));
    ```
    
3. 選択するユーザーを10人に制限
    
    ```tsx
    //SELECT * FROM Users LIMIT 10;
    const threeRef = query(usersRef, orderByKey(), limitToFirest(10));
    
    // orderByKey()は省略可能のため、下記でも可能
    const threeRef = query(usersRef, limitToFirst(10));
    ```
    
4. "s"から始まる全ユーザーを取得
    
    ```tsx
    // SELECT * FROM Users WHERE Name LIKE "s%";
    const fourRef = query(usersRef, orderByChild("Name"), startAt("s"), endAt("s\uf8ff"));
    ```
    
5. 50歳未満のユーザーを取得
    
    ```tsx
    // SELECT * FROM Users WHERE Age < 50;
    const fiveRef = query(usersRef, orderByChild("Age"), endAt(49));
    ```
    
6. 50歳超過のユーザーを取得
    
    ```tsx
    // SELECT * FROM Users WHERE Age > 50;
    const sixRef = query(usersRef, orderByChild("Age"), startAt(51));
    ```
    
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
    
    これはFirebase SDKで同時に使用できる order関数は 1つだけという制約があるためです。
    
    参考文献
    
    [ウェブ上でデータリストを操作する | Firebase Realtime Database](https://firebase.google.com/docs/database/web/lists-of-data?hl=ja#sort_data)
    
    この制約を守りつつ、検索するにはデータ構造を検索できる形に最適化する必要があります。
    
    order関数が1つしか使えないのなら、検索対象を1つにまとめてデータベースに追加すれば良いのです。
    
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
    
    "Location_Age"を追加しました。この状態で、クエリを修正します。
    
    ```tsx
    // SELECT * FROM Users WHERE Location = "tokyo" && Age = 52;
    const eightRef = query(usersRef, orderByChild("Location_Age"), equalTo("tokyo_52"))
    ```
    

## まとめ

- WHERE句やLIMIT句はFirebase SDKの関数ベースで再現できます。
- Firebase SDK Ver.9はVer.8から破壊的変更がされており、Ver.8メソッドチェーンが主流だったのに対して、Ver.9からは引数で指定する形に変わっているため注意が必要です。
- 1つのクエリに対して指定できるorder関数は1つまでとなっているため、検索できるようにデータ構造を最適化または設計段階で検索方法を検討した上で構築する必要があります。