import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Heading, Stack } from '@chakra-ui/layout';

import { ChangeEventHandler, FC, useState } from 'react';

//Propsの型定義
type PropType = {};

const PlayGround: FC<PropType> = () => {
  const [imgSrc, setImgSrc] = useState('');
  const reader = new FileReader();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files![0];
    reader.onload = (ev: any) => {
      setImgSrc(ev.target.result);
      console.log(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack h={'100vh'} w={1000} p={8} backgroundColor={'gray.50'} spacing={10}>
      <Heading fontSize="3xl">PlayGround</Heading>

      <Button
        as="label"
        backgroundColor={'blue.300'}
        color={'gray.100'}
        type="submit"
        _hover={{ backgroundColor: 'blue.500' }}
        _loading={{ backgroundColor: 'green.500' }}
      >
        test
        <Input type="file" display="none" onChange={handleChange} accept="image/png" />
      </Button>

      <Avatar src={imgSrc} size="2xl" />
      <Image src={imgSrc} size="2xl" />
    </Stack>
  );
};

PlayGround.displayName = 'PlayGround';
export default PlayGround;
