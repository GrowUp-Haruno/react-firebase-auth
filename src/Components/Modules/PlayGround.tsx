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
  const playGroundWidth = 1000;
  const playGroundPadding = 8;
  const playGroundClientWidth = 1000 - 8 * 4 * 2;

  const [imgSrc, setImgSrc] = useState<string>('');
  const [image, setImage] = useState<HTMLImageElement>();
  const [cropImage, setCropImage] = useState<string>('');

  const reader = new FileReader();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files![0];
    // console.log(file)

    const img = document.createElement('img');
    reader.onload = (ev: any) => {
      img.src = ev.target.result;
      const aspectRaito = img.width / img.height;
      const canvas = document.createElement('canvas');
      if (
        true
        // crop.width !== undefined &&
        // crop.height !== undefined &&
        // crop.x !== undefined &&
        // crop.y !== undefined
      ) {
        canvas.width = playGroundClientWidth;
        canvas.height = playGroundClientWidth / aspectRaito;
        console.log(`canvasWidth:${canvas.width}, canvasHeight:${canvas.height}`);
        
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => {
          console.log(file.size)
          console.log(blob!.size)
        }, 'image/jpeg', 1)
        setImgSrc(canvas.toDataURL('image/webp', 1));
      }
      // setImgSrc(ev.target.result);
      // console.log(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const [crop, setCrop] = useState<ReactCrop.Crop>({
    aspect: 1,
  });

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

        canvas.width = 192;
        canvas.height = 192;

        // canvas.width = crop.width;
        // canvas.height = crop.height;
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
          192,
          192

          // crop.width,
          // crop.height
        );

        console.log(canvas.width);

        const base64Image = canvas.toDataURL('image/png', 1);
        // console.log(canvas);

        // reader.onload = (ev: any) => {
        //   console.log(ev.target.result);
        // };

        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log(blob);
              // reader.readAsDataURL(blob);
            }
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
