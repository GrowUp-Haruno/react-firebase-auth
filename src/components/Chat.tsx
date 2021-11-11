import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Heading, HStack, Stack } from '@chakra-ui/layout';
import { FC } from 'react';
import AvatarBox from '../atoms/AvatarBox';
import { auth } from '../firebase';

//Propsの型定義
// type PropsType = {

// }

const Chat: FC = () => {
  return (
    <Stack h={'100vh'} w={1000} p={8} backgroundColor={'gray.50'}>
      <AvatarBox>
        <Heading size="sm">{auth.currentUser?.displayName?.toString()}</Heading>
        <HStack justify='flex-end'>
        <Input variant="flushed" placeholder="今どうしてる？" />

        <Button borderRadius='25' colorScheme="blue">送信</Button>
        </HStack>
      </AvatarBox>
      <AvatarBox>
        <Heading size="sm">ユーザー</Heading>
        <Box>あのイーハトーヴォのすきとほった風、夏でも底に冷たさをもつ青いそら</Box>
      </AvatarBox>
    </Stack>
  );
};

Chat.displayName = 'Chat';
export default Chat;
