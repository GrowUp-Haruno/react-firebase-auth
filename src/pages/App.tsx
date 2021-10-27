import { SignIn } from '../components/SignIn';
import './App.css';
import { SignUp } from '../components/SignUp';
import { useApp } from './hooks/useApp';

const App = () => {
  const { signInUser } = useApp();

  signInUser && console.log(signInUser.emailVerified);
  return (
    <div className="App">
      <SignUp />
      <SignIn />
    </div>
  );
};

export default App;
