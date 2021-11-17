import { Box, HStack, Spacer } from '@chakra-ui/react';
import { FC, memo } from 'react';

import UserMenu from '../Elements/UserMenu';

//Propsの型定義
//type PropsType = {
//
//}

const HeaderNavi: FC = memo(() => {
  return (
    <>
      <HStack h="5vh" spacing="4">
        <Box p="4" fontSize="lg">
          Fire Chat
        </Box>
        <Box p="4">Logo</Box>
        <Spacer />
        <UserMenu />
      </HStack>
    </>
  );
});

HeaderNavi.displayName = 'HeaderNavi';
export default HeaderNavi;
