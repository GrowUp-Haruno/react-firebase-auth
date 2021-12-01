import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Heading, HStack, Stack } from '@chakra-ui/layout';
import { FC, memo } from 'react';
import AvatarBox from '../Elements/AvatarBox';
import { auth } from '../../firebase';
import { User } from 'firebase/auth';

//Propsの型定義
type PropType = {
  signInUser: User;
};

const Chat: FC<PropType> = memo(({ signInUser }) => {
  return (
    <Stack h={'95vh'} w={1000} p={8} backgroundColor={'gray.50'}>
      <AvatarBox
        uid={signInUser.uid}
        // displayName={signInUser.displayName}   
        photoURL={signInUser.photoURL}
        key={signInUser.uid}
      >
        <Heading size="sm">{auth.currentUser?.displayName?.toString()}</Heading>
        <HStack justify="flex-end">
          <Input variant="flushed" placeholder="今どうしてる？" />

          <Button borderRadius="25" colorScheme="blue">
            送信
          </Button>
        </HStack>
      </AvatarBox>
      {/* <AvatarBox signInUser={signInUser}>
        <Heading size="sm">ユーザー</Heading>
        <Box>あのイーハトーヴォのすきとほった風、夏でも底に冷たさをもつ青いそら</Box>
      </AvatarBox> */}
    </Stack>
  );
});

Chat.displayName = 'Chat';
export default Chat;
