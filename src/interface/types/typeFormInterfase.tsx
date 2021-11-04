export type FormInterfaseTypes  ={
  /** フォームタイトル */
  formTitle?: string | undefined;

  /** 入力フォームの送信イベントハンドラ */
  handleSubmit: React.FormEventHandler<HTMLFormElement>;

  /** 入力ボックスの変化イベントハンドラ */
  handleChange: React.ChangeEventHandler<HTMLInputElement>;

  /** ボタンの有効無効切り替え */
  isDesable: boolean;
};
