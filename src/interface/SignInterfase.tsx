// Module import
import { FC, memo } from 'react';

// User import
import { SignInterfasePropsType } from './types/typeSignInterfase';

export const SignInterfase: FC<SignInterfasePropsType> = memo(({
  signFunction,
  handleSubmit,
  handleChange,
  email,
  password,
  isDesable,
}) => {
  return (
    <>
      <h1>ユーザー{signFunction}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <div>
          <button disabled={isDesable}>{signFunction}</button>
        </div>
      </form>
    </>
  );
});

SignInterfase.displayName = 'SignInterfase';