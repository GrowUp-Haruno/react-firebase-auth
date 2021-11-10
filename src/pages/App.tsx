import { SignIn } from '../components/SignIn';
// import './App.css';
import { SignUp } from '../components/SignUp';
import { useApp } from './hooks/useApp';
import { SignOut } from '../components/SignOut';
import { ChangeProfile } from '../components/ChangeProfile';
import { ChakraProvider, Flex, useColorModeValue, Stack } from '@chakra-ui/react';

const App = () => {
  const { signInUser } = useApp();
  return (
    <ChakraProvider>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
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
        </Stack>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
