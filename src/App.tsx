import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import './App.css';
import Signup from './components/SignUp';
import { auth } from './firebase';

function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      const uid = user && user.uid;
      console.log(uid);
    });
  }, []);
  return (
    <div className="App">
      <Signup />
    </div>
  );
}

export default App;
