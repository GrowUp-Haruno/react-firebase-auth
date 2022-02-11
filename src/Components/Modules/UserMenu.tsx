import { Menu, MenuButton, MenuItem } from '@chakra-ui/menu';
import { Avatar } from '@chakra-ui/avatar';
import { FC, memo } from 'react';
import { Button, HStack, MenuDivider, MenuList, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useFirebase } from './hooks/useFirebase';
import { auth, avatarStorageUrl } from '../../firebase';
import PrimaryModal from '../Elements/PrimaryModal';
import { ChangeProfile } from './ChangeProfile';
import { User } from 'firebase/auth';

//Propsの型定義
type PropType = {
  signInUser: User;
};

const UserMenu: FC<PropType> = memo(({ signInUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack pr="4">
        <Menu>
          <MenuButton as={Button} cursor={'pointer'} minW={0} rounded={'full'} variant={'link'}>
            <Avatar
              size="md"
              src={
                auth.currentUser!.photoURL
                  ? `${avatarStorageUrl}${auth.currentUser!.uid}?alt=media&token=${
                      auth.currentUser!.photoURL
                    }`
                  : undefined
              }
              icon={<AddIcon />}
              // icon={auth.currentUser?.photoURL ? <></> : <AddIcon />}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>
              Signed in as <br />
              {auth.currentUser?.displayName}
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={onOpen}>プロフィール変更</MenuItem>
            <MenuItem>Link 2</MenuItem>
            <MenuDivider />
            <MenuItem onClick={useFirebase().userSignOut}>サインアウト</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <PrimaryModal isOpen={isOpen} onClose={onClose} modalTitle={'ユーザー情報の更新'} size="md">
        <ChangeProfile signInUser={signInUser} />
      </PrimaryModal>
    </>
  );
});

UserMenu.displayName = 'UserMenu';
export default UserMenu;
