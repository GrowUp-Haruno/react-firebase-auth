import { Menu, MenuButton, MenuItem } from '@chakra-ui/menu';
import { Avatar } from '@chakra-ui/avatar';
import { FC, memo } from 'react';
import { Button, HStack, MenuDivider, MenuList } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useFirebase } from '../components/hooks/useFirebase';
import { auth } from '../firebase';

//Propsの型定義
type PropsTypes = {};

const UserMenu: FC<PropsTypes> = memo(() => {
  return (
    <HStack pr="4">
      <Menu>
        <MenuButton as={Button} cursor={'pointer'} minW={0} rounded={'full'} variant={'link'}>
          <Avatar
            size="sm"
            src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : undefined}
            icon={<AddIcon />}
            // icon={auth.currentUser?.photoURL ? <></> : <AddIcon />}
          />
        </MenuButton>
        <MenuList>
          <MenuItem>Signed in as <br/>{auth.currentUser?.displayName}</MenuItem>
          <MenuDivider />
          <MenuItem>Link 1</MenuItem>
          <MenuItem>Link 2</MenuItem>
          <MenuDivider />
          <MenuItem onClick={useFirebase().userSignOut}>サインアウト</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
});

UserMenu.displayName = 'UserMenu';
export default UserMenu;
