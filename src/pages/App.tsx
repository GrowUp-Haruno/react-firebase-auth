import { SignIn } from '../components/SignIn';
// import './App.css';
// import { SignUp } from '../components/SignUp';
import { useApp } from './hooks/useApp';
// import { SignOut } from '../components/SignOut';
// import { ChangeProfile } from '../components/ChangeProfile';
import { ChakraProvider, Flex, useColorModeValue } from '@chakra-ui/react';
import Chat from '../components/Chat';
import Loading from '../components/Loading';

const App = () => {
  const { signInUser,loginCheck } = useApp();
  return (
    <ChakraProvider>
      <Flex
        direction={'column'}
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.200', 'gray.800')}
      >
        {/* <SignUp /> */}
        {signInUser === null ? (
          loginCheck ? <Loading />:  <SignIn />
        ) : (
            <>
              <Chat/>
            {/* <ChangeProfile />
            <SignOut /> */}
          </>
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default App;
