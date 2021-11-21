import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { HStack, Stack, VStack } from '@chakra-ui/layout';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { ChangeEventHandler, FC, useState } from 'react';
import Card from '../Elements/Card';
import SendButton from '../Elements/SendButton';

//Propsの型定義
type PropType = {};

const playGroundWidth = 1000;
const playGroundPadding = 8;
const cropSize = 96;

const PlayGround: FC<PropType> = () => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [image, setImage] = useState<HTMLImageElement>();
  const [cropImage, setCropImage] = useState<string>('');
  const [cropBlob, setCropBlob] = useState<Blob>();
  const [crop, setCrop] = useState<ReactCrop.Crop>({ aspect: 1 });

  const reader = new FileReader();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files![0];
    reader.onload = (ev: any) => setImgSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const getCroppedImg = async () => {
    if (
      image !== undefined &&
      crop.width !== undefined &&
      crop.height !== undefined &&
      crop.x !== undefined &&
      crop.y !== undefined
    ) {
      try {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        // 切り取り範囲の幅と高さをcanvasにセット
        canvas.width = cropSize;
        canvas.height = cropSize;

        // canvaに描画するためのコンテキストを取得してctxへセット
        const ctx = canvas.getContext('2d');

        // canvasに切り取った画像を描画
        ctx?.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          canvas.width,
          canvas.height
        );

        // canvasからbase64(DataURI)へ変換
        const base64Image = canvas.toDataURL('image/jpeg', 0.6);
        setCropImage(base64Image);

        // canvasからBlobへ変換
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCropBlob(blob);
            }
          },
          'image/jpeg',
          0.6
        );
      } catch (e) {
        console.log('crop the image');
      }
    }
  };

  const handleReactCrop = (newCrop: ReactCrop.Crop) => {
    setCrop(newCrop);
  };

  return (
    <HStack spacing={10}>
      <Stack
        h={'92vh'}
        w={playGroundWidth}
        p={playGroundPadding}
        backgroundColor={'gray.50'}
        spacing={10}
      >
        {/* <Heading fontSize="3xl">PlayGround</Heading> */}
        <Button
          as="label"
          backgroundColor={'blue.300'}
          color={'gray.100'}
          type="submit"
          _hover={{ backgroundColor: 'blue.500' }}
          _loading={{ backgroundColor: 'green.500' }}
        >
          画像を選択
          <Input type="file" display="none" onChange={handleChange} accept="image/png,image/jpeg" />
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
        <SendButton buttonName={'送信'} buttonState={false} />
      </Stack>
      <VStack>
        <Card>
          <Avatar src={cropImage} size="md" />
          <Image src={cropImage} size="md" w={'48px'} id="img" />
        </Card>
      </VStack>
    </HStack>
  );
};

PlayGround.displayName = 'PlayGround';
export default PlayGround;
