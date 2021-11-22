// import { ref } from '@firebase/storage';
import { ref, getDownloadURL, UploadMetadata, uploadString } from 'firebase/storage';
import { ChangeEventHandler, useState } from 'react';
import { storage } from '../../../firebase';

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

  // BlobからFirebase Storageへアップロード
  const handleUploadFromBlob = async () => {
    const storageRef = ref(storage, 'some-child');
    const metadata: UploadMetadata = {
      cacheControl: 'public,max-age=3600,immutable',
    };
    try {
      await uploadString(storageRef, cropImage, 'data_url', metadata);
      console.log('Uploaded a data_url string!');
      // const result = await getDownloadURL(storageRef);
      // setDownloadUrl(result);
    } catch (error) {
      console.log(error);
    }
  };

  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const handleGetDownloadURL = async () => {
    try {
      const storageRef = ref(storage, 'some-child');
      const result = await getDownloadURL(storageRef);
      
      setDownloadUrl(result);
    } catch (error) {
      console.log(error)
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
