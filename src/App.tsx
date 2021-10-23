import './App.css';
import { useApp } from './components/hooks/useApp';
import Signup from './components/SignUp';

function App() {
  const { signInUser, setSignInUser } = useApp();
  
  signInUser && console.log(signInUser.emailVerified);
  return (
    <div className="App">
      <Signup/>
    </div>
  );
}

export default App;
