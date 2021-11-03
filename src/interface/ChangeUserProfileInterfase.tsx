// Module import
import { FC, memo } from 'react';
import { auth } from '../firebase';

// User import
import { ChangeUserProfileInterfasePropsType } from './types/typeChangeUserProfileInterfase';

export const ChangeUserProfileInterfase: FC<ChangeUserProfileInterfasePropsType> = memo(
  ({  handleSubmit, handleChange, userName, phone, isDesable }) => {
    return (
      <>
        <h1>ユーザー情報の更新</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ユーザー名</label>
            <p>現在の設定: {auth.currentUser?.displayName}</p>
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder="userName"
              onChange={handleChange}
              value={userName}
            />
          </div>
          <div>
            <label>電話番号</label>
            <p>現在の設定: {auth.currentUser?.phoneNumber}</p>
            <input id="phone" name="phone" type="text" onChange={handleChange} value={phone} />
          </div>
          <div>
            <button disabled={isDesable}>更新</button>
          </div>
        </form>
      </>
    );
  }
);

ChangeUserProfileInterfase.displayName = 'ChangeUserProfileInterfase';
