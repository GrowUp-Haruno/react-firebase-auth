import { Menu, MenuButton, MenuItem } from '@chakra-ui/menu';
import { Avatar } from '@chakra-ui/avatar';
import { FC } from 'react';
import { Button, HStack, MenuDivider, MenuList } from '@chakra-ui/react';
import { useFirebase } from './hooks/useFirebase';

//Propsの型定義
type PropsTypes = {};

const UserMenu: FC<PropsTypes> = () => {
  return (
    <HStack pr="4">
      <Menu>
        <MenuButton as={Button} cursor={'pointer'} minW={0} rounded={'full'} variant={'link'}>
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1619639522705-d416aabbc3d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80"
          />
        </MenuButton>
        <MenuList>
          <MenuItem>Link 1</MenuItem>
          <MenuItem>Link 2</MenuItem>
          <MenuDivider />
          <MenuItem onClick={useFirebase().userSignOut}>サインアウト</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

UserMenu.displayName = 'UserMenu';
export default UserMenu;
