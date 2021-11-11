import { Avatar } from '@chakra-ui/avatar';
import { HStack, Stack } from '@chakra-ui/layout';
import { FC, ReactNode } from 'react';

//Propsの型定義
type PropType = {
  children: ReactNode;
};

const AvatarBox: FC<PropType> = ({ children }) => {
  return (
    <HStack p={4} pr={8}>
      <Avatar
        m={4}
        src="https://images.unsplash.com/photo-1619639522705-d416aabbc3d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80"
      />
      <Stack flex={1}>{children}</Stack>
    </HStack>
  );
};

AvatarBox.displayName = 'AvatarBox';
export default AvatarBox;
