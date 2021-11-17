import { useColorModeValue } from '@chakra-ui/color-mode'
import { Stack } from '@chakra-ui/layout'
import { FC} from 'react'

//Propsの型定義
type PropsType = {
  
}

const Card: FC<PropsType> = (props) => {
  return (
    <Stack
      spacing={4}
      w={'full'}
      maxW={'md'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      my={12}
    >
      {props.children}
    </Stack>
  );
};

Card.displayName = 'Card'
export default Card