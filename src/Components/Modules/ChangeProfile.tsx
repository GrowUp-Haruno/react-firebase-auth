import { Button, FormControl, FormHelperText, FormLabel, Input, Stack } from '@chakra-ui/react';
import { FC, memo } from 'react';
import ReactCrop from 'react-image-crop';
import { auth } from '../../firebase';
import FormInput from '../Elements/FormInput';
import SendButton from '../Elements/SendButton';

import { useChangeProfile } from './hooks/useChangeProfile';

import { ChangeUserProfileTypes } from './types/typeChangeUserProfile';

export const ChangeProfile: FC = memo(() => {
  const {
    inputValueState,
    buttonState,
    imgSrc,
    crop,
    setImage,
    getCroppedImg,
    handleChangeObjectState,
    handleSetImage,
    handleReactCrop,
    handleUploadFromBlob,
  } = useChangeProfile();

  return (
    <Stack spacing={4} as="form" onSubmit={handleUploadFromBlob}>
      <Stack spacing={4}>
        <FormControl key="userName">
          <FormLabel>ユーザー名</FormLabel>
          <FormInput<ChangeUserProfileTypes>
            inputName="userName"
            handleChange={handleChangeObjectState}
            inputType="text"
            index={1}
            inputPlaceholder="ユーザー名"
            inputValueState={inputValueState}
          />
          <FormHelperText>現在の設定: {auth.currentUser?.displayName}</FormHelperText>
        </FormControl>


          <FormLabel>アバター設定</FormLabel>
          <Button
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
      </Stack>
      <SendButton buttonName="変更を確定" buttonState={buttonState} />
    </Stack>
  );
});

ChangeProfile.displayName = 'ChangeProfile';
