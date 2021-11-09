import { SignIn } from '../components/SignIn';
import './App.css';
import { SignUp } from '../components/SignUp';
import { useApp } from './hooks/useApp';
import { SignOut } from '../components/SignOut';
import { ChangeProfile } from '../components/ChangeProfile';

const App = () => {
  const { signInUser } = useApp();
  return (
    <div className="App">
      <SignUp />
      {signInUser === null ? (
        <SignIn />
      ) : (
        <>
          <ChangeProfile />
          <SignOut />
        </>
      )}
    </div>
  );
};

export default App;
