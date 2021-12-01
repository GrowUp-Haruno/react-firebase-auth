import { Button } from '@chakra-ui/button';
import { Box, Heading, HStack } from '@chakra-ui/layout';
import { FC, memo } from 'react';
import AvatarBox from '../Elements/AvatarBox';
import PrimaryInput from '../Elements/PrimaryInput';
import { useChatInput } from './hooks/useChat';
import { ChatInputPropType } from './types/typeChat';

/**
 * チャットの入出力を表示
 * @example <ChatInput signInUser={signInUser} onOpenChangeProfile={onOpen} />
 * @argument { firebase.auth.Users　} signInUser - ログインユーザー情報のstate
 * @argument {　()=>void　} onOpenChangeProfile
 * - ユーザーのプロファイルを変更するモーダルを開くためのボタンのハンドラ、
 * hakra-ui/reactのuseDisclosure().onOpenを指定すること
 */
const ChatInput: FC<ChatInputPropType> = memo(({ signInUser, onOpenChangeProfile }) => {
  const { tweet, setTweet, sendTweet } = useChatInput(signInUser, 'オープン');

  return (
    <>
      {signInUser.displayName !== null ? (
        <AvatarBox
          uid={signInUser.uid}
          displayName={signInUser.displayName}
          photoURL={signInUser.photoURL}
          key={signInUser.uid}
        >
          <Heading size="sm">{signInUser.displayName.toString()}</Heading>
          <HStack justify="flex-end">
            <PrimaryInput
              variant="flushed"
              placeholder="今どうしてる？"
              state={tweet}
              setState={setTweet}
            />
            <Button borderRadius="25" colorScheme="blue" onClick={sendTweet}>
              送信
            </Button>
          </HStack>
        </AvatarBox>
      ) : (
        <>
          <Box>チャットへ参加するにはプロフィール情報の「ユーザー名」を登録してください</Box>
          <Button onClick={onOpenChangeProfile}>プロフィール登録</Button>
        </>
      )}
    </>
  );
});

ChatInput.displayName = 'ChatInput';
export default ChatInput;
