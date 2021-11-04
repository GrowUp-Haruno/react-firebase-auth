import { User } from 'firebase/auth';
import { FC, memo } from 'react';
import { auth } from '../firebase';
import { ChangeUserProfileInterfase } from '../interface/ChangeUserProfileInterfase';
import { useChangeProfile } from './hooks/useChangeProfile';

type propTypes = {
  signInUser: User;
};

export const ChangeProfile: FC<propTypes> = memo(({ signInUser }) => {
  // const { handleChangeProfile } = useChangeProfile(signInUser);
  return (
    <></>
    // <ChangeUserProfileInterfase
    //   handleChange={}
    //   handleSubmit={handleChangeProfile}
    //   userName={}
    //   phone={ }
    //   isDesable={}
            
    // />
    // <>
    //   <h1>ユーザー情報の更新</h1>
    //   <p>{signInUser.displayName}</p>
    //   <p>{auth.currentUser?.displayName}</p>
    //   <button onClick={handleChangeProfile}>更新</button>
    // </>
  );
});

ChangeProfile.displayName = 'SignOut';
