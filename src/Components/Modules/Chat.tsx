import { HStack, Stack } from '@chakra-ui/layout';
import { FC, memo } from 'react';
import { Heading, useDisclosure } from '@chakra-ui/react';

import PrimaryModal from '../Elements/PrimaryModal';
import { ChatType } from './types/typeChat';
import ChatView from './ChatView';
import ChatInput from './ChatInput';
import { ChangeProfile } from './ChangeProfile';

const Chat: FC<ChatType> = memo(({ signInUser }) => {
  const chatWidth = 1000;
  const chatPadding = 8;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack spacing={10}>
        <Stack h={'92vh'} w={chatWidth} p={chatPadding} backgroundColor={'gray.50'} spacing={10}>
          <Heading fontSize="3xl">PlayGround</Heading>

          <ChatInput signInUser={signInUser} onOpenChangeProfile={onOpen} />

          <ChatView category="オープン" />
        </Stack>
      </HStack>

      <PrimaryModal isOpen={isOpen} onClose={onClose} modalTitle={'ユーザー情報の更新'} size="md">
        <ChangeProfile />
      </PrimaryModal>
    </>
  );
});

Chat.displayName = 'Chat';
export default Chat;
