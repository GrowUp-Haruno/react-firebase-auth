import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { HStack, Stack, VStack } from '@chakra-ui/layout';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { ChangeEventHandler, FC, useState } from 'react';
import Card from '../Elements/Card';

//Propsの型定義
type PropType = {};

const PlayGround: FC<PropType> = () => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const reader = new FileReader();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files![0];
    reader.onload = (ev: any) => {
      setImgSrc(ev.target.result);
      // console.log(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const [crop, setCrop] = useState<ReactCrop.Crop>({
    aspect: 1,
  });

  const [image, setImage] = useState<HTMLImageElement>();
  const [cropImage, setCropImage] = useState<string>('');

  const getCroppedImg = async () => {
    if (
      image !== undefined &&
      crop.width !== undefined &&
      crop.height !== undefined &&
      crop.x !== undefined &&
      crop.y !== undefined
    ) {
      try {

        // const canvas = document.createElement('canvas');
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        // console.log(`naturalWidth:${image.naturalWidth}`);
        // console.log(`naturalHeight:${image.naturalHeight}`);
        // console.log(`Width:${image.width}`);
        // console.log(`Height:${image.height}`);
        // console.log(`scaleX:${image.naturalWidth / image.width}`);
        // console.log(`scaleY:${image.naturalHeight / image.height}`);

        // 切り取り範囲の幅と高さをcanvasにセット
        canvas.width = crop.width;
        canvas.height = crop.height;
        // console.log(`canvas.width:${canvas.width}`);
        // console.log(`canvas.height:${canvas.height}`);
        // console.log(`crop.x:${crop.x}`);
        // console.log(`crop.y:${crop.y}`);

        // canvaに描画するためのコンテキストを取得してctxへセット
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        const base64Image = canvas.toDataURL('image/png', 1);
        // console.log(`DataURI:${base64Image}`);

        reader.onload = (ev: any) => {
          // console.log(ev.target.result);
        };

        canvas.toBlob(
          (blob) => {
            console.log(blob)
            reader.readAsDataURL(blob!)
          },
          'image/png',
          1
        );

        setCropImage(base64Image);
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
      <Stack h={'95vh'} w={1000} p={8} backgroundColor={'gray.50'} spacing={10}>
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
      </Stack>
      <VStack>
        <Card>
          <Avatar src={cropImage} size="2xl" />
          <Image src={cropImage} size="2xl" w={128} id="img" />
        </Card>
      </VStack>
    </HStack>
  );
};

PlayGround.displayName = 'PlayGround';
export default PlayGround;
