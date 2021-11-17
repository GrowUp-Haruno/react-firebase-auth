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
  };
  return { FirebaseErrors };
};
