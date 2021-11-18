# エラーコードの説明と解決手順

## 設定先

- src/Components/Modules/hooks/useFirebaseErrors.tsx

## 設定済み

- auth/user-not-found 提供された ID に対応する既存のユーザー レコードはありません。
- auth/email-already-exists 提供されたメールアドレスはすでに既存のユーザーによって使用されています。各ユーザーに固有のメールアドレスが必要です。
- auth/internal-error リクエストの処理中に、認証サーバーで予期しないエラーが発生しました。エラー メッセージには、追加情報を含む認証サーバーからのレスポンスが含まれます。エラーが解決しない場合は、バグレポートに問題を報告してください。
- auth/invalid-display-name displayName ユーザー プロパティに指定された値は無効です。空でない文字列を指定する必要があります。
- auth/invalid-email email ユーザー プロパティに指定された値は無効です。文字列のメールアドレスを指定する必要があります。
- auth/invalid-password password ユーザー プロパティに指定された値は無効です。6 文字以上の文字列を指定する必要があります。
- auth/invalid-photo-url photoURL ユーザー プロパティに指定された値は無効です。文字列 URL を指定する必要があります。

## 未設定

- auth/uid-already-exists 提供された uid はすでに既存のユーザーによって使用されています。各ユーザーに固有の uid が必要です。
- auth/claims-too-large setCustomUserClaims() に渡されたクレーム ペイロードが、最大許容サイズ（1,000 バイト）を超えています。
- auth/id-token-expired 指定された Firebase ID トークンは期限切れです。
- auth/id-token-revoked Firebase ID トークンが取り消されました。
- auth/insufficient-permission Admin SDK の初期化に使用された認証情報に、リクエストされた Authentication リソースにアクセスするための権限がありません。適切な権限を持つ認証情報を生成し、その認証情報を使用して Admin SDK を認証する方法については、Firebase プロジェクトを設定するをご覧ください。
- auth/invalid-argument 無効な引数が Authentication メソッドに提供されました。このエラー メッセージには追加情報が含まれます。
- auth/invalid-claims setCustomUserClaims() に渡されたカスタム クレーム属性が無効です。
- auth/invalid-continue-uri 続行 URL は有効な URL 文字列でなければなりません。
- auth/invalid-creation-time 作成時刻は有効な UTC 日付文字列でなければなりません。
- auth/invalid-credential Admin SDK の認証に使用された認証情報は、目的のアクションの実行には使用できません。createCustomToken() や verifyIdToken() などの特定の Authentication メソッドでは、更新トークンやアプリケーションのデフォルト認証情報ではなく、証明書の資格情報を使用して SDK が初期化される必要があります。証明書の資格情報を使用して Admin SDK を認証する方法については、SDK を初期化するをご覧ください。
- auth/invalid-disabled-field disabled ユーザー プロパティに指定された値は無効です。ブール値を指定する必要があります。
- auth/invalid-dynamic-link-domain 指定されたダイナミック リンクのドメインは、現在のプロジェクトに対して構成されていないか、承認されていません。
- auth/invalid-email-verified emailVerified ユーザー プロパティに指定された値は無効です。ブール値を指定する必要があります。
- auth/invalid-hash-algorithm ハッシュ アルゴリズムは、サポートされているアルゴリズムのリスト内の文字列の 1 つと一致している必要があります。
- auth/invalid-hash-block-size ハッシュのブロックサイズには有効な数値を指定してください。
- auth/invalid-hash-derived-key-length ハッシュ派生キーの長さには有効な数値を指定してください。
- auth/invalid-hash-key ハッシュキーは有効なバイトバッファでなければなりません。
- auth/invalid-hash-memory-cost ハッシュメモリのコストには有効な数値を指定してください。
- auth/invalid-hash-parallelization ハッシュ並列化には有効な数値を指定してください。
- auth/invalid-hash-rounds ハッシュ ラウンドには有効な数値を指定してください。
- auth/invalid-hash-salt-separator ハッシング アルゴリズムの salt separator フィールドは、有効なバイトバッファでなければなりません。
- auth/invalid-id-token 指定された ID トークンは有効な Firebase ID トークンではありません。
- auth/invalid-last-sign-in-time 最終ログイン時間は、有効な UTC 日付文字列でなければなりません。
- auth/invalid-page-token listUsers() に指定されたネクスト ページトークンが無効です。空ではない文字列を指定する必要があります。
- auth/invalid-password-hash パスワード ハッシュは有効なバイトバッファでなければなりません。
- auth/invalid-password-salt パスワード ソルトは有効なバイトバッファでなければなりません。
- auth/invalid-phone-number phoneNumber に指定された値は無効です。空でない E.164 標準準拠の ID 文字列を指定する必要があります。
- auth/invalid-provider-data providerData は、有効な UserInfo オブジェクトの配列でなければなりません。
- auth/invalid-provider-id providerId は、サポートされている有効なプロバイダ ID 文字列でなければなりません。
- auth/invalid-oauth-responsetype OAuth responseType を 1 つだけ true に設定する必要があります。
- auth/invalid-session-cookie-duration セッション Cookie の期間には、5 分から 2 週間の間の有効な数値をミリ秒単位で指定してください。
- auth/invalid-uid uid は、128 文字以下の空でない文字列を指定する必要があります。
- auth/invalid-user-import インポート対象のユーザー レコードが無効です。
- auth/maximum-user-count-exceeded インポートするユーザーの最大許容数を超えています。
- auth/missing-android-pkg-name Android アプリをインストールする必要がある場合は、Android パッケージ名を入力する必要があります。
- auth/missing-continue-uri リクエストで有効な続行 URL を提供する必要があります。
- auth/missing-hash-algorithm パスワード ハッシュを使用してユーザーをインポートするには、ハッシング アルゴリズムとそのパラメータを指定する必要があります。
- auth/missing-ios-bundle-id リクエストに iOS Bundle ID が指定されていません。
- auth/missing-uid 現在のオペレーションには uid 識別子が必要です。
- auth/missing-oauth-client-secret OIDC コードフローを有効にするには、OAuth 構成クライアント シークレットが必要です。
- auth/operation-not-allowed 提供されたログイン プロバイダは Firebase プロジェクトで無効になっています。 Firebase コンソールの [ログイン方法] セクションから有効にしてください。
- auth/phone-number-already-exists 提供された phoneNumber はすでに既存のユーザーによって使用されています。各ユーザーに固有の phoneNumber が必要です。
- auth/project-not-found Admin SDK を初期化するために使用された認証情報に対して Firebase プロジェクトが見つかりませんでした。プロジェクトの認証情報を生成し、Admin SDK の認証に使用する方法については、Firebase プロジェクトの設定をご覧ください。
- auth/reserved-claims setCustomUserClaims() に指定された 1 つ以上のカスタム ユーザー クレームが予約済みです。たとえば、OIDC 固有のクレーム（sub、iat、iss、exp、aud、auth_time など）をカスタム クレームのキーとして使用することはできません。
- auth/session-cookie-expired 提供された Firebase セッションの Cookie は期限切れです。
- auth/session-cookie-revoked Firebase セッション Cookie が取り消されました。
- auth/unauthorized-continue-uri 続行 URL のドメインがホワイトリストに登録されていません。Firebase コンソールでドメインをホワイトリストに登録します。

## 参考 URL

- https://firebase.google.com/docs/auth/admin/errors?hl=ja
