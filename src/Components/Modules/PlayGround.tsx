import { HStack, Stack } from '@chakra-ui/layout';

// import 'react-image-crop/dist/ReactCrop.css';

import { FC, useEffect } from 'react';
// import { usePlayGround } from './hooks/usePlayGround';
import { Button, Heading } from '@chakra-ui/react';
import {
  child,
  endBefore,
  onChildAdded,
  onValue,
  orderByChild,
  push,
  ref,
  startAfter,
  update,
} from '@firebase/database';
import { database } from '../../firebase';
import { endAt, equalTo, limitToFirst, query, startAt } from 'firebase/database';
import SecondaryButton from '../Elements/SecondaryButton';

//Propsの型定義
type PropType = {};

const playGroundWidth = 1000;
const playGroundPadding = 8;

const PlayGround: FC<PropType> = () => {
  // Root Reference
  const rootRef = ref(database);

  // Users Root Reference
  const messagesRef = child(rootRef, 'messages');

  const childRef = child(messagesRef, 'open');
  const handleClick = () => {
    const newChildKey = push(childRef).key;
    console.log(newChildKey);
  };

  useEffect(() => {
    return () => {};
  }, []);

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
        <Button onClick={handleClick} />
      </Stack>
    </HStack>
  );
};

PlayGround.displayName = 'PlayGround';
export default PlayGround;
