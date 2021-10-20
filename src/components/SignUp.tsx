import { createUserWithEmailAndPassword } from '@firebase/auth';
// import { FirebaseError } from '@firebase/util';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { auth } from '../firebase';

//Propsの型定義
type PropsType = {};

const Signup: FC<PropsType> = () => {
  type initilaUserTypes = {
    email: string;
    password: string;
  };
  const initialSignupUser: initilaUserTypes = { email: '', password: '' };
  const [signupUser, setSignupUser] = useState<initilaUserTypes>(initialSignupUser);

  const [isDesable, setIsDesable] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSignupUser({ ...signupUser, [`${event.target.id}`]: event.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      const { email, password } = signupUser;
      event.preventDefault();
      setIsDesable(true);
      const UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(UserCredential);
      setIsDesable(false);
      setSignupUser(initialSignupUser);
    } catch (error) {}

  };
  return (
    <>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            value={signupUser.email}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={signupUser.password}
          />
        </div>
        <div>
          <button disabled={isDesable}>登録</button>
        </div>
      </form>
    </>
  );
};

Signup.displayName = 'Signup';
export default Signup;
