import { HStack, Stack } from '@chakra-ui/layout';
import { FC, memo } from 'react';

import { ChatType } from './types/typeChat';

const PlayGround: FC<ChatType> = memo(({ signInUser }) => {
  const playGroundWidth = 1000;
  const playGroundPadding = 8;

  return (
    <>
      <HStack spacing={10}>
        <Stack
          h={'192vh'}
          w={playGroundWidth}
          p={playGroundPadding}
          backgroundColor={'gray.50'}
          spacing={10}
        ></Stack>
      </HStack>
    </>
  );
});

PlayGround.displayName = 'PlayGround';
export default PlayGround;
