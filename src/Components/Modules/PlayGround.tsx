import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Image, Img } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { HStack, Stack, VStack } from '@chakra-ui/layout';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { FC } from 'react';
import Card from '../Elements/Card';
import SendButton from '../Elements/SendButton';
import { usePlayGround } from './hooks/usePlayGround';
import { Heading } from '@chakra-ui/react';


//Propsの型定義
type PropType = {};

const playGroundWidth = 1000;
const playGroundPadding = 8;

const PlayGround: FC<PropType> = () => {
  const {
    crop,
    imgSrc,
    cropImage,
    downloadUrl,
    setImage,
    handleSetImage,
    getCroppedImg,
    handleReactCrop,
    handleUploadFromBlob,
    handleGetDownloadURL,
  } = usePlayGround();
  console.log(downloadUrl)
  return (
    <HStack spacing={10}>
      <Stack
        h={'195vh'}
        w={playGroundWidth}
        p={playGroundPadding}
        backgroundColor={'gray.50'}
        spacing={10}
      >
        <Heading size="sm">Play Ground</Heading>
        {/* <Heading fontSize="3xl">PlayGround</Heading> */}
        {/* <Button
          as="label"
          backgroundColor={'blue.300'}
          color={'gray.100'}
          type="submit"
          _hover={{ backgroundColor: 'blue.500' }}
          _loading={{ backgroundColor: 'green.500' }}
        >
          画像を選択
          <Input
            type="file"
            display="none"
            onChange={handleSetImage}
            accept="image/png,image/jpeg"
          />
        </Button>
        <ReactCrop
          src={imgSrc}
          crop={crop}
          onChange={handleReactCrop}
          circularCrop={true}
          onImageLoaded={(image) => {
            setImage(image);
          }}
          onDragEnd={getCroppedImg}
        />
        <SendButton buttonName={'送信'} buttonState={false} handleClick={handleUploadFromBlob} />
        <SendButton buttonName={'取得'} buttonState={false} handleClick={handleGetDownloadURL} />
        <Img src={downloadUrl} /> */}
      </Stack>
      {/* <VStack>
        <Card>
          <Avatar src={cropImage} size="md" />
          <Image src={cropImage} size="md" w={'48px'} id="img" />
        </Card>
      </VStack>  */}
    </HStack>
  );
};

PlayGround.displayName = 'PlayGround';
export default PlayGround;
