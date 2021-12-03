type FirebaseErrorsType = {
  [key: string]: {
    title: string;
    description: string;
  };
};

type useFirebaseErrorsTypes = () => {
  FirebaseErrors: FirebaseErrorsType;
};

export const useFirebaseErrors: useFirebaseErrorsTypes = () => {
  const FirebaseErrors: FirebaseErrorsType = {
    'auth/user-not-found': {
      title: 'ログインエラー',
      description: 'ユーザーが存在しないか、パスワードに誤りがあります。',
    },
    'auth/email-already-exists': {
      title: 'メールアドレスエラー',
      description: '提供されたメールアドレスはすでに使用されています。',
    },
    'auth/invalid-display-name': {
      title: 'ユーザー名エラー',
      description: 'ユーザー名に指定された文字に無効な文字(空文字を含む)が含まれています。',
    },
    'auth/invalid-email': {
      title: 'メールアドレスエラー',
      description: '有効なメールアドレスではありません。',
    },
    'auth/invalid-password': {
      title: 'パスワードエラー',
      description: 'passwordに指定された値は無効です。6 文字以上の文字列を指定してください。',
    },
    'auth/invalid-photo-url': {
      title: '',
      description: '指定された値は無効です。文字列 URL を指定する必要があります。',
    },
    'auth/internal-error': {
      title: '予期しないエラー',
      description: '予期しないエラーが発生しました。',
    },
    'changeProfile-error': {
      title: 'プロフィール変更制限',
      description: 'プロフィール変更制限中です。１分後、再試行してください。',
    },
  };
  return { FirebaseErrors };
};
