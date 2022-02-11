import { SignIn } from '../Components/Modules/SignIn';
import { SignUp } from '../Components/Modules/SignUp';
import { useApp } from './hooks/useApp';
import { ChakraProvider, Flex, useColorModeValue } from '@chakra-ui/react';
import Chat from '../Components/Modules/Chat';
import Loading from '../Components/Modules/Loading';
import { useState } from 'react';
import ResetPassword from '../Components/Modules/ResetPassword';
import HeaderNavi from '../Components/Modules/HeaderNavi';

// 現在無効化
// import PlayGround from '../Components/Modules/PlayGround';

const App = () => {
  const { loginCheck, signInUser } = useApp();
  const [mode, setMode] = useState<'SignIn' | 'SignUp' | 'ResetPassword'>('SignIn');
  return (
    <ChakraProvider>
      {signInUser !== null && <HeaderNavi signInUser={signInUser }/>}
      <Flex
        direction="column"
        h={signInUser ? '200vh-60px' : '100vh'}
        align="center"
        justify="center"
        bg={useColorModeValue('gray.200', 'gray.800')}
      >
        {signInUser === null ? (
          loginCheck ? (
            <Loading />
          ) : (
              <>
                {/* todo: サインアウトした後にログインするとチャットデータが読み込めなくなる */}
              {mode === 'SignIn' && <SignIn setMode={setMode} />}
              {mode === 'SignUp' && <SignUp setMode={setMode} />}
              {mode === 'ResetPassword' && <ResetPassword setMode={setMode} />}
            </>
          )
        ) : (
          <>
            {/* <PlayGround signInUser={signInUser} /> */}
            <Chat signInUser={signInUser} category="オープン" />
          </>
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default App;
