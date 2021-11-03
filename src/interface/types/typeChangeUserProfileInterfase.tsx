export type ChangeUserProfileInterfasePropsType = {
  /** 入力フォームの送信イベントハンドラ */
  handleSubmit: React.FormEventHandler<HTMLFormElement>;

  /** 入力ボックスの変化イベントハンドラ */
  handleChange: React.ChangeEventHandler<HTMLInputElement>;

  /** メールアドレス入力ボックスの値 */
  userName: string;

  /** パスワード入力ボックスの値 */
  phone: string;

  /** ボタンの有効無効切り替え */
  isDesable: boolean;
};
