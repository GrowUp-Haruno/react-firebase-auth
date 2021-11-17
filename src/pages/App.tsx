import { SignIn } from '../Components/Modules/SignIn';
import { SignUp } from '../Components/Modules/SignUp';
import { useApp } from './hooks/useApp';
// import { SignOut } from '../components/SignOut';
// import { ChangeProfile } from '../components/ChangeProfile';
import { ChakraProvider, Flex, useColorModeValue } from '@chakra-ui/react';
import Chat from '../Components/Modules/Chat';
import Loading from '../Components/Modules/Loading';
import { useState } from 'react';
import ResetPassword from '../Components/Modules/ResetPassword';
import HeaderNavi from '../Components/Modules/HeaderNavi';
import { auth } from '../firebase';

const App = () => {
  const {  loginCheck } = useApp();
  const [mode, setMode] = useState<'SignIn' | 'SignUp' | 'ResetPassword'>('SignIn');
  return (
    <ChakraProvider>
      {auth.currentUser !== null && <HeaderNavi />}
      {/* {signInUser && <HeaderNavi />} */}
      <Flex
        direction="column"
        h={auth.currentUser ? '95vh' : '100vh'}
        align="center"
        justify="center"
        bg={useColorModeValue('gray.200', 'gray.800')}
      >
        {auth.currentUser === null ? (
          // {signInUser === null ? (
          loginCheck ? (
            <Loading />
          ) : (
            <>
              {mode === 'SignIn' && <SignIn setMode={setMode} />}
              {mode === 'SignUp' && <SignUp setMode={setMode} />}
              {mode === 'ResetPassword' && <ResetPassword setMode={setMode} />}
            </>
          )
        ) : (
          <>
            <Chat />
            {/* <ChangeProfile />
            <SignOut /> */}
          </>
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default App;
