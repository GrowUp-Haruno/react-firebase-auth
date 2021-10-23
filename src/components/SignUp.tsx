import { FC, memo } from 'react';

import { useSignUp } from './hooks/useSignUp';

//Propsの型定義
type PropsType = {};

const Signup: FC<PropsType> = memo(() => {
  const { signupUser, isButtonDesable, handleChangeState, handleSubmitFirebaseCreateUser } = useSignUp();

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
            onChange={handleChangeState}
            value={signupUser.email}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChangeState}
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
