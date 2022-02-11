import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack
} from '@chakra-ui/react';
import { User } from '@firebase/auth';
import { FC, memo } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { auth, avatarStorageUrl } from '../../firebase';
import FormInput from '../Elements/FormInput';
import SendButton from '../Elements/SendButton';
import { useChangeProfile } from './hooks/useChangeProfile';
import { ChangeUserProfileTypes } from './types/typeChangeUserProfile';

type PropType = {
  signInUser: User;
};

export const ChangeProfile: FC<PropType> = memo(({ signInUser }) => {
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
  } = useChangeProfile(signInUser);

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
          <FormHelperText>現在の設定： {auth.currentUser?.displayName}</FormHelperText>
        </FormControl>
        <Divider />
        <Stack>
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
              flex={1}
            />
          </Button>
          <HStack>
            <Box color="gray.500" fontSize="sm">
              現在の設定：
            </Box>
            <Avatar
              size="md"
              src={
                auth.currentUser!.photoURL
                  ? `${avatarStorageUrl}${auth.currentUser!.uid}?alt=media&token=${
                      auth.currentUser!.photoURL
                    }`
                  : undefined
              }
            />
          </HStack>
        </Stack>
        {imgSrc && (
          <Stack>
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
            {crop.width === 0 && <Box>ドラッグ＆ドロップで範囲を指定してください</Box>}
          </Stack>
        )}
      </Stack>
      <Divider />
      <SendButton buttonName="変更を確定" buttonState={buttonState} />
    </Stack>
  );
});

ChangeProfile.displayName = 'ChangeProfile';
