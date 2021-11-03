import { SignIn } from '../components/SignIn';
import './App.css';
import { SignUp } from '../components/SignUp';
import { useApp } from './hooks/useApp';
import { SignOut } from '../components/SignOut';

const App = () => {
  const { signInUser } = useApp();
  return (
    <div className="App">
      <SignUp />
      {signInUser === null ? <SignIn /> : <SignOut />}
    </div>
  );
};

export default App;
