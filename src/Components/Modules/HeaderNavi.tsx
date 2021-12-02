import { Box, HStack, Spacer } from '@chakra-ui/react';
import { User } from '@firebase/auth';
import { FC, memo } from 'react';

import UserMenu from './UserMenu';

//Propsの型定義
type PropType = {
  signInUser: User;
};

const HeaderNavi: FC<PropType> = memo(({ signInUser }) => {
  return (
    <>
      <HStack h="60px" spacing="4">
        <Box p="4" fontSize="lg">
          Fire Chat
        </Box>
        <Box p="4">Logo</Box>
        <Spacer />
        <UserMenu signInUser={signInUser} />
      </HStack>
    </>
  );
});

HeaderNavi.displayName = 'HeaderNavi';
export default HeaderNavi;
