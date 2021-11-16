import { Box, HStack, Spacer } from '@chakra-ui/react';
import { FC } from 'react';
import UserMenu from '../components/UserMenu';

//Propsの型定義
//type PropsType = {
//
//}

const HeaderNavi: FC = (props) => {
  return (
    <HStack h="5vh" spacing="4">
      <Box p="4">Logo</Box>
      <Box p="4">Logo</Box>
      <Spacer />
      <UserMenu />
    </HStack>
  );
};

HeaderNavi.displayName = 'HeaderNavi';
export default HeaderNavi;
