import { HStack, Stack } from '@chakra-ui/layout';

// import 'react-image-crop/dist/ReactCrop.css';

import { FC, useEffect } from 'react';
// import { usePlayGround } from './hooks/usePlayGround';
import { Heading } from '@chakra-ui/react';
import { child, endBefore, onChildAdded, onValue, orderByChild, ref, startAfter, update } from '@firebase/database';
import { database } from '../../firebase';
import { endAt, equalTo, limitToFirst, query, startAt } from 'firebase/database';

//Propsの型定義
type PropType = {};

const playGroundWidth = 1000;
const playGroundPadding = 8;

const PlayGround: FC<PropType> = () => {
  // const dbMessagesRef = query(dbRef(database, 'messages/'),orderByChild('id'),limitToFirst(2));
  // // const dbMessagesRef = dbRef(database, 'messages/');
  // const dbUsersRef = dbRef(database, 'users/');

  // Root Reference
  const rootRef = ref(database);

  // Users Root Reference
  const usersRef = child(rootRef, 'Users');

  useEffect(() => {
    const oneRef = child(rootRef, 'Users/1');
    const oneUnsubscribe = onValue(oneRef, (snapshot) => console.log(snapshot.val()));

    // SELECT * FROM Users WHERE Email = "tanaka@example.com";
    const twoRef = query(usersRef, orderByChild('Email'), equalTo('tanaka@example.com'));
    const twoUnsubscribe = onValue(twoRef, (snapshot) => console.log(snapshot.val()));

    //SELECT * FROM Users LIMIT 10;
    const threeRef = query(usersRef, limitToFirst(10));
    const threeUnsubscribe = onValue(threeRef, (snapshot) => console.log(snapshot.val()));

    // SELECT * FROM Users WHERE Name LIKE "s%";
    const fourRef = query(usersRef, orderByChild('Name'), startAt('s'), endAt('s\uf8ff'));
    const fourUnsubscribe = onValue(fourRef, (snapshot) => console.log(snapshot.val()));

    // SELECT * FROM Users WHERE Age < 50;
    const fiveRef = query(usersRef, orderByChild('Age'), endBefore(52));
    const fiveUnsubscribe = onValue(fiveRef, (snapshot) => console.log(snapshot.val()));

    // SELECT * FROM Users WHERE Age > 50;
    const sixRef = query(usersRef, orderByChild('Age'), startAfter(51));
    const sixUnsubscribe = onValue(sixRef, (snapshot) => console.log(snapshot.val()));

    // SELECT * FROM Users WHERE Age <= 20 && Age >= 100;
    const sevenRef = query(usersRef, orderByChild('Age'), startAt(20), endAt(100));
    const sevenUnsubscribe = onValue(sevenRef, (snapshot) => console.log(snapshot.val()));

    // SELECT * FROM Users WHERE Location = "tokyo" && Age = 52;
    const eightRef = query(usersRef, orderByChild('Location_Age'), equalTo('osaka_20'));
    const eightUnsubscribe = onValue(eightRef, (snapshot) => console.log(snapshot.val()));

    return () => {
      oneUnsubscribe();
      twoUnsubscribe();
      threeUnsubscribe();
      fourUnsubscribe();
      fiveUnsubscribe();
      sixUnsubscribe();
      sevenUnsubscribe();
      eightUnsubscribe();
    };
  }, [rootRef, usersRef]);
  // const Unsubscribe = onChildAdded(dbMessagesRef, (messageSnapshot) => {
  //   const childRef = child(dbUsersRef, messageSnapshot.val().uid);
  //   onValue(
  //     childRef,
  //     (snapshot) => {
  //       const data = {
  //         tweet: messageSnapshot.val().tweet,
  //         userData: { uid: messageSnapshot.val().uid, ...snapshot.val() },
  //       };
  //       console.log(data)
  //     },
  //     { onlyOnce: true }
  //   );
  // });
  //   const Unsubscribe = onValue(
  //     dbMessagesRef,
  //     (messageSnapshot) => {
  //       console.log(messageSnapshot.val());
  //     },
  //     { onlyOnce: true }
  //   );

  //   return () => {
  //     Unsubscribe();
  //   };
  // }, [dbMessagesRef, dbUsersRef]);

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
