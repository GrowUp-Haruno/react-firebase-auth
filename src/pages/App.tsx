import { SignIn } from '../components/SignIn';
// import './App.css';
import { SignUp } from '../components/SignUp';
import { useApp } from './hooks/useApp';
import { SignOut } from '../components/SignOut';
import { ChangeProfile } from '../components/ChangeProfile';
import { ChakraProvider, Flex, useColorModeValue } from '@chakra-ui/react';

const App = () => {
  const { signInUser } = useApp();
  return (
    <ChakraProvider>
      <Flex
        direction={'column'}
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <SignUp />
        {signInUser === null ? (
          <SignIn />
        ) : (
          <>
            <ChangeProfile />
            <SignOut />
          </>
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default App;
