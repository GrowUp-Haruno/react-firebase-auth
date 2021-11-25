import { HStack, Stack } from '@chakra-ui/layout';

import 'react-image-crop/dist/ReactCrop.css';

import { FC } from 'react';
import { usePlayGround } from './hooks/usePlayGround';
import { Heading } from '@chakra-ui/react';

//Propsの型定義
type PropType = {};

const playGroundWidth = 1000;
const playGroundPadding = 8;

const PlayGround: FC<PropType> = () => {

  return (
    <HStack spacing={10}>
      <Stack
        h={'192vh'}
        w={playGroundWidth}
        p={playGroundPadding}
        backgroundColor={'gray.50'}
        spacing={10}
      >
        <Heading fontSize="3xl">PlayGround</Heading>
      </Stack>
    </HStack>
  );
};

PlayGround.displayName = 'PlayGround';
export default PlayGround;
