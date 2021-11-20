import { Menu, MenuButton, MenuItem } from '@chakra-ui/menu';
import { Avatar } from '@chakra-ui/avatar';
import { FC, memo } from 'react';
import { Button, HStack, MenuDivider, MenuList, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useFirebase } from '../Modules/hooks/useFirebase';
import { auth } from '../../firebase';
import PrimaryModal from './PrimaryModal';
import { ChangeProfile } from '../Modules/ChangeProfile';

//Propsの型定義
type PropsTypes = {};

const UserMenu: FC<PropsTypes> = memo(() => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  return (
    <>
      <HStack pr="4">
        <Menu>
          <MenuButton as={Button} cursor={'pointer'} minW={0} rounded={'full'} variant={'link'}>
            <Avatar
              size="md"
              src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : undefined}
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

      <PrimaryModal isOpen={isOpen} onClose={onClose} modalTitle={'ユーザー情報の更新'}>
        <ChangeProfile />
      </PrimaryModal>
    </>
  );
});

UserMenu.displayName = 'UserMenu';
export default UserMenu;
