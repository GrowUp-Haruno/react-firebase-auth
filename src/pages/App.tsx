import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';
import { useApp } from './hooks/useApp';
// import { SignOut } from '../components/SignOut';
// import { ChangeProfile } from '../components/ChangeProfile';
import { ChakraProvider, Flex, useColorModeValue } from '@chakra-ui/react';
import Chat from '../components/Chat';
import Loading from '../components/Loading';
import { useState } from 'react';
import ResetPassword from '../components/ResetPassword';
import HeaderNavi from '../components/HeaderNavi';
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
