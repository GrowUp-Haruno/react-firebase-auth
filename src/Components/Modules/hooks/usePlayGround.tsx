// import { ref } from '@firebase/storage';
import { ref, getDownloadURL, UploadMetadata, uploadString } from 'firebase/storage';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { auth, storage } from '../../../firebase';
import { useFirebase } from './useFirebase';

type usePlayGroundTypes = () => {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  imgSrc: string;
  crop: ReactCrop.Crop;
  handleReactCrop: (newCrop: ReactCrop.Crop) => void;
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>;
  getCroppedImg: () => Promise<void>;
  cropImage: string;
  handleUploadFromBlob: () => void;
  handleGetDownloadURL: () => Promise<void>;
  downloadUrl: string;
};
export const usePlayGround: usePlayGroundTypes = () => {
  const cropSize = 96;
  const [imgSrc, setImgSrc] = useState<string>('');
  const [image, setImage] = useState<HTMLImageElement>();
  const [cropImage, setCropImage] = useState<string>('');
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

      } catch (e) {
        console.log('crop the image');
      }
    }
  };

  const handleReactCrop = (newCrop: ReactCrop.Crop) => {
    setCrop(newCrop);
  };

  const { changeUserProfile } = useFirebase();
  // BlobからFirebase Storageへアップロード
  const handleUploadFromBlob = useCallback(async () => {
    const storageRef = ref(storage, auth.currentUser ? auth.currentUser.uid : "");
    const metadata: UploadMetadata = {
      cacheControl: 'public,max-age=3600,immutable',
    };
    try {
      await uploadString(storageRef, cropImage, 'data_url', metadata);
      const result = await getDownloadURL(storageRef);

      await changeUserProfile({
        userName: auth.currentUser?.displayName ? auth.currentUser.displayName : '',
        photoUrl: result ? result : '',
      });
      // setDownloadUrl(result);
    } catch (error) {
      console.log(error);
    }
  },[changeUserProfile, cropImage]);

  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const handleGetDownloadURL = async () => {
    try {
      const storageRef = ref(storage, auth.currentUser ? auth.currentUser.uid : '');
      const result = await getDownloadURL(storageRef);

      setDownloadUrl(result);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    handleChange,
    imgSrc,
    crop,
    handleReactCrop,
    setImage,
    getCroppedImg,
    cropImage,
    handleUploadFromBlob,
    handleGetDownloadURL,
    downloadUrl,
  };
};
