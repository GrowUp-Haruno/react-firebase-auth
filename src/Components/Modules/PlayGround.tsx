import { Box, HStack, Stack } from '@chakra-ui/layout';

// import 'react-image-crop/dist/ReactCrop.css';

import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
// import { usePlayGround } from './hooks/usePlayGround';
import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import {
  child,
  endBefore,
  equalTo,
  limitToFirst,
  onChildAdded,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  startAfter,
  update,
} from '@firebase/database';
import { database } from '../../firebase';
// import { endAt, equalTo, limitToFirst, query, startAt } from 'firebase/database';
// import SecondaryButton from '../Elements/SecondaryButton';
import PrimaryModal from '../Elements/PrimaryModal';
import { ChangeProfile } from './ChangeProfile';
import { User } from '@firebase/auth';
import AvatarBox from '../Elements/AvatarBox';
import PrimaryInput from '../Elements/PrimaryInput';

//Propsの型定義
type PropType = { signInUser: User };

const playGroundWidth = 1000;
const playGroundPadding = 8;

const PlayGround: FC<PropType> = memo(({ signInUser }) => {
  // Reference setting
  const rootRef = ref(database);
  const messagesRef = child(rootRef, 'messages');

  const [tweet, setTweet] = useState<string>('');
  type updatesType = {
    [key: string]: {
      uid: string;
      displayName: string;
      photoUrl: string;
      category: 'オープン';
      tweet: string;
    };
  };

  const handleClick = useCallback(async () => {
    if (tweet !== '' && signInUser.displayName !== null) {
      try {
        const newChildKey = push(messagesRef).key;
        const updates: updatesType = {};

        updates[`${newChildKey}`] = {
          uid: signInUser.uid,
          displayName: signInUser.displayName,
          photoUrl: signInUser.photoURL ? signInUser.photoURL : '',
          category: 'オープン',
          tweet: tweet,
        };
        await update(messagesRef, updates);
        setTweet('');
        console.log('書き込みが完了しました');
      } catch (error) {
        console.log('送信エラー');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInUser.displayName, signInUser.photoURL, signInUser.uid, tweet]);

  const [snapshotVal, setSnapshotVal] = useState<updatesType>({});
  useEffect(() => {
    // queryの設定
    const messagesQuery = query(
      messagesRef,
      orderByChild('category'),
      equalTo('オープン'),
      limitToFirst(100)
    );

    const Unsubscribe = onValue(
      messagesQuery,
      (snapshot) => {
        setSnapshotVal(snapshot.val());
        console.log('読み込みが完了しました');
      },
      { onlyOnce: true }
    );
    return () => {
      Unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(Object.values(snapshotVal))

  Object.values(snapshotVal).forEach((value) => {

  })
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack spacing={10}>
        <Stack
          h={'192vh'}
          w={playGroundWidth}
          p={playGroundPadding}
          backgroundColor={'gray.50'}
          spacing={10}
        >
          <Heading fontSize="3xl">PlayGround</Heading>

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
                <Button borderRadius="25" colorScheme="blue" onClick={handleClick}>
                  送信
                </Button>
              </HStack>
            </AvatarBox>
          ) : (
            <>
              <Box>チャットへ参加するにはプロフィール情報の「ユーザー名」を登録してください</Box>
              <Button onClick={onOpen}>プロフィール登録</Button>
            </>
          )}

          {/* <AvatarBox signInUser={signInUser}>
            <Heading size="sm">ユーザー</Heading>
            <Box>あのイーハトーヴォのすきとほった風、夏でも底に冷たさをもつ青いそら</Box>
          </AvatarBox> */}
        </Stack>
      </HStack>
      <PrimaryModal isOpen={isOpen} onClose={onClose} modalTitle={'ユーザー情報の更新'} size="md">
        <ChangeProfile />
      </PrimaryModal>
    </>
  );
});

PlayGround.displayName = 'PlayGround';
export default PlayGround;
