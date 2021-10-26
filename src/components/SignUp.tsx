import { FC, memo } from 'react';

import { useSignUp } from './hooks/useSignUp';

//Propsの型定義
type PropsType = {};

const Signup: FC<PropsType> = memo(() => {
  const { signupUser, isButtonDesable, handleChangeObjectState, handleSubmitFirebaseCreateUser } = useSignUp();

  return (
    <>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmitFirebaseCreateUser}>
        <div>
          <label>メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChangeObjectState}
            value={signupUser.email}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChangeObjectState}
            value={signupUser.password}
          />
        </div>
        <div>
          <button disabled={isButtonDesable}>登録</button>
        </div>
      </form>
    </>
  );
});

Signup.displayName = 'Signup';
export default Signup;
