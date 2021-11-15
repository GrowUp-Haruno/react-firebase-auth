import { Box, HStack, Spacer } from '@chakra-ui/react';
import {FC} from 'react'

//Propsの型定義
//type PropsType = {
//	
//}

const HeaderNavi:FC = (props) => {
  return (
    <HStack minH="4vh">
      <Box p="4">Logo</Box>
      <Box p="4">Logo</Box>
      <Spacer />
      <Box p="4">Logo</Box>
    </HStack>
  ); 
}

HeaderNavi.displayName = 'HeaderNavi'
export default HeaderNavi