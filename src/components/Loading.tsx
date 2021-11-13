import { Heading, HStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { FC } from 'react';
import Card from '../atoms/Card';

//Propsの型定義
// type PropsType = {

// }

const Loading: FC = () => {
  return (
    <Card>
      <HStack spacing={8}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.300" size="xl" />
        <Heading fontSize='4xl' flex={1} textAlign='center'>Loading...</Heading>
      </HStack>
    </Card>
  );
};

Loading.displayName = 'Loading';
export default Loading;
