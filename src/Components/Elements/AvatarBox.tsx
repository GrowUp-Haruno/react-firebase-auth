import { Avatar } from '@chakra-ui/avatar';
import { HStack, Stack } from '@chakra-ui/layout';
import { FC } from 'react';
import { avatarStorageUrl } from '../../firebase';

//Propsの型定義
type PropType = {
  uid: string;
  displayName?: string;
  photoURL: string | null;
};

const AvatarBox: FC<PropType> = ({ children, displayName, uid, photoURL }) => {
  return (
    <HStack p={4} spacing={4}>
      <Avatar
        name={displayName}
        size="md"
        src={
          photoURL !== null ? `${avatarStorageUrl}${uid}?alt=media&token=${photoURL}` : undefined
        }
        // icon={<AddIcon />}
        // icon={auth.currentUser?.photoURL ? <></> : <AddIcon />}
      />
      <Stack flex={1}>{children}</Stack>
    </HStack>
  );
};

AvatarBox.displayName = 'AvatarBox';
export default AvatarBox;
