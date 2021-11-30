import { useForm } from './useForm';
import { ChangeUserProfileTypes } from '../types/typeChangeUserProfile';
import { useFirebase } from './useFirebase';
import { auth, avatarStorageUrl, storage } from '../../../firebase';
import { ChangeEventHandler, FormEventHandler, useCallback, useMemo, useState } from 'react';
import { getDownloadURL, ref, UploadMetadata, uploadString } from 'firebase/storage';
// import { ref as dbRef, set } from 'firebase/database';
import { useToast } from '@chakra-ui/react';

export const useChangeProfile = () => {
  const { inputValueState, handleChangeObjectState } = useForm<ChangeUserProfileTypes>(
    {
      userName: auth.currentUser?.displayName ? auth.currentUser.displayName : '',
      photoUrl: auth.currentUser?.photoURL ? auth.currentUser.photoURL : '',
    },
    useFirebase().changeUserProfile
  );

  const cropSize = 96;
  const [imgSrc, setImgSrc] = useState<string>('');
  const [image, setImage] = useState<HTMLImageElement>();
  const [cropImage, setCropImage] = useState<string>('');
  const cropInitial = useMemo(() => {
    return { aspect: 1 };
  }, []);
  const [crop, setCrop] = useState<ReactCrop.Crop>(cropInitial);
  const [buttonState, setButtonState] = useState<boolean>(false);
  const toast = useToast();

  const handleSetImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const reader = new FileReader();
      const file = event.target.files![0];
      setCrop(cropInitial);
      reader.onload = (ev: any) => setImgSrc(ev.target.result);
      reader.readAsDataURL(file);
    },
    [cropInitial]
  );

  const getCroppedImg = useCallback(async () => {
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
      } catch (e) {
        console.log('crop the image');
      }
    }
  }, [crop.height, crop.width, crop.x, crop.y, image]);

  const handleReactCrop = useCallback((newCrop: ReactCrop.Crop) => setCrop(newCrop), []);

  // BlobからFirebase Storageへアップロード
  const { changeUserProfile } = useFirebase();

  const handleUploadFromBlob = useCallback<FormEventHandler<HTMLDivElement>>(
    async (event) => {
      setButtonState(true);
      event.preventDefault();
      const storageRef = ref(storage, `avatar/${auth.currentUser!.uid}`);
      const metadata: UploadMetadata = {
        cacheControl: 'public,max-age=3600,immutable',
      };

      // const dbUsersRef = dbRef(database, `users/${auth.currentUser!.uid}`);
      try {
        if (crop.width) {
          await uploadString(storageRef, cropImage, 'data_url', metadata);
          const result = (await getDownloadURL(storageRef)).replace(
            `${avatarStorageUrl}${auth.currentUser!.uid}?alt=media&token=`,
            ''
          );

          // const result = await token(storageRef);

          await changeUserProfile({
            userName: inputValueState.userName,
            photoUrl: result ? result : '',
          });

          // await set(dbUsersRef, {
          //   userName: inputValueState.userName,
          //   photoUrl: result ? result : '',
          // });
        } else {
          await changeUserProfile({
            userName: inputValueState.userName,
            photoUrl: inputValueState.photoUrl,
          });

          // await set(dbUsersRef, {
          //   userName: inputValueState.userName,
          //   photoUrl: inputValueState.photoUrl,
          // });
        }
        setButtonState(false);
        toast({
          title: '変更完了',
          description: 'プロフィールの変更が完了しました！',
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setButtonState(false);
      }
    },
    [
      changeUserProfile,
      crop.width,
      cropImage,
      inputValueState.photoUrl,
      inputValueState.userName,
      toast,
    ]
  );

  return {
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
  };
};
