import { FC, memo } from 'react';
import { Box, Heading } from '@chakra-ui/react';

import AvatarBox from '../Elements/AvatarBox';
import { ChatViewPropType } from './types/typeChat';
import { useChatView } from './hooks/useChat';

/**
 * チャットの入出力を表示
 * @example <ChatView category={category} />
 * @argument { category　} category - チャットのカテゴリ
 */
const ChatView: FC<ChatViewPropType> = memo(({ category }) => {
  const { snapshotVal } = useChatView(category);

  return (
    <>
      {Object.values(snapshotVal)
        .reverse()
        .map((value, index) => (
          <AvatarBox
            uid={value.uid}
            displayName={value.displayName}
            photoURL={value.photoURL}
            key={`${value.uid}-${index}`}
          >
            <Heading size="sm">{value.displayName}</Heading>
            <Box>{value.tweet}</Box>
          </AvatarBox>
        ))}
    </>
  );
});

ChatView.displayName = 'ChatView';
export default ChatView;
