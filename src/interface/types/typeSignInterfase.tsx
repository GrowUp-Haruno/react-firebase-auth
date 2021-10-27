export type SignInterfasePropsType = {
  /** 入力フォームのタイトルと送信ボタン名 */
  signFunction: '登録' | 'ログイン';

  /** 入力フォームの送信イベントハンドラ */
  handleSubmit: React.FormEventHandler<HTMLFormElement>;

  /** 入力ボックスの変化イベントハンドラ */
  handleChange: React.ChangeEventHandler<HTMLInputElement>;

  /** メールアドレス入力ボックスの値 */
  email: string;

  /** パスワード入力ボックスの値 */
  password: string;

  /** ボタンの有効無効切り替え */
  isDesable: boolean;
};
