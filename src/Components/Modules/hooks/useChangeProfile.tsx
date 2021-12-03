import { useForm } from './useForm';
import {
  ChangeUserProfileTypes,
  updatesTweetType,
  usersUpdatesType,
} from '../types/typeChangeUserProfile';
import { useFirebase } from './useFirebase';
import { avatarStorageUrl, database, storage } from '../../../firebase';
import { ChangeEventHandler, FormEventHandler, useCallback, useMemo, useState } from 'react';
import { getDownloadURL, ref, UploadMetadata, uploadString } from 'firebase/storage';
import {
  child,
  equalTo,
  onValue,
  orderByChild,
  query,
  ref as dbRef,
  update,
  DataSnapshot,
  serverTimestamp,
} from 'firebase/database';
import { useToast } from '@chakra-ui/react';
import { User } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useFirebaseErrors } from './useFirebaseErrors';

export const useChangeProfile = (signInUser: User) => {
  const { inputValueState, handleChangeObjectState } = useForm<ChangeUserProfileTypes>(
    {
      userName: signInUser.displayName ? signInUser.displayName : '',
      photoUrl: signInUser.photoURL ? signInUser.photoURL : '',
    },
    useFirebase().changeUserProfile
  );
  // 更新間隔[分]
  const updateInterval = 1;

  // 連続更新の制限回数
  const numberOfLimits = 3;

  const cropSize = 96;
  const [imgSrc, setImgSrc] = useState<string>('');
  const [image, setImage] = useState<HTMLImageElement>();
  const [cropImage, setCropImage] = useState<string>('');
  const cropInitial = useMemo(() => {
    return { aspect: 1 };
  }, []);
  const [crop, setCrop] = useState<ReactCrop.Crop>(cropInitial);
  const [buttonState, setButtonState] = useState<boolean>(false);
  const { FirebaseErrors } = useFirebaseErrors();
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
      const storageRef = ref(storage, `avatar/${signInUser.uid}`);
      const metadata: UploadMetadata = {
        cacheControl: 'public,max-age=3600,immutable',
      };

      // const dbUsersRef = dbRef(database, `users/${signInUser.uid}`);
      const rootRef = dbRef(database);
      const messagesRef = child(rootRef, 'messages');
      const messagesQuery = query(messagesRef, orderByChild('uid'), equalTo(signInUser.uid));
      let updates: updatesTweetType = {};

      const usersRef = child(rootRef, 'users');
      const usersQuery = query(child(usersRef, signInUser.uid));
      const usersUpdates: usersUpdatesType = {};
      // usersUpdates[signInUser.uid] = { lastUpdate: serverTimestamp(), updateCount: 0 };

      try {
        /**
         * 短時間の変更回数及び前回の更新時間を確認
         */
        await new Promise<void>((resolve, reject) => {
          onValue(
            usersQuery,
            (snapshot) => {
              if (snapshot.val()) {
                if (
                  snapshot.val().updateCount < numberOfLimits ||
                  snapshot.val().lastUpdate + updateInterval * 60 * 1000 < new Date().getTime()
                ) {
                  if (
                    snapshot.val().lastUpdate + updateInterval * 60 * 1000 <
                    new Date().getTime()
                  ) {
                    usersUpdates[signInUser.uid] = {
                      lastUpdate: serverTimestamp(),
                      updateCount: 1,
                    };
                    resolve();
                  } else {
                    usersUpdates[signInUser.uid] = {
                      lastUpdate: serverTimestamp(),
                      updateCount: snapshot.val().updateCount + 1,
                    };
                    resolve();
                  }
                } else {
                  reject(new FirebaseError('changeProfile-error', ''));
                }
              } else {
                // プロフィール初変更
                usersUpdates[signInUser.uid] = { lastUpdate: serverTimestamp(), updateCount: 1 };
                resolve();
              }
            },
            { onlyOnce: true }
          );
        });

        if (crop.width) {
          await uploadString(storageRef, cropImage, 'data_url', metadata);
          const result = (await getDownloadURL(storageRef)).replace(
            `${avatarStorageUrl}${signInUser.uid}?alt=media&token=`,
            ''
          );

          await changeUserProfile({
            userName: inputValueState.userName,
            photoUrl: result ? result : '',
          });

          const snapshot = await new Promise<DataSnapshot>((res) =>
            onValue(messagesQuery, res, { onlyOnce: true })
          );
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach((key) => {
              updates[`${key}`] = {
                ...snapshot.val()[key],
                displayName: inputValueState.userName,
                photoURL: result ? result : '',
              };
            });
            await update(messagesRef, updates);
          }
        } else {
          await changeUserProfile({
            userName: inputValueState.userName,
            photoUrl: inputValueState.photoUrl,
          });

          const snapshot = await new Promise<DataSnapshot>((resolve) => {
            onValue(
              messagesQuery,
              (snapshot) => {
                resolve(snapshot);
              },
              { onlyOnce: true }
            );
          });
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach((key) => {
              updates[`${key}`] = {
                ...snapshot.val()[key],
                displayName: inputValueState.userName,
                photoURL: inputValueState.photoUrl,
              };
            });
            await update(messagesRef, updates);
          }
        }
        console.log(usersUpdates);
        await update(usersRef, usersUpdates);

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
        if (error instanceof FirebaseError) {
          if (FirebaseErrors[`${error.code}`] !== undefined) {
            // Firebaseの非同期APIのエラーを表示
            toast({
              title: FirebaseErrors[`${error.code}`].title,
              description: FirebaseErrors[`${error.code}`].description,
              status: 'error',
              position: 'top',
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: '予期しないエラー',
              description: '予期しないエラーが発生しました',
              status: 'error',
              position: 'top',
              duration: 9000,
              isClosable: true,
            });
          }
        } else {
          // その他の非同期関数のエラー表示
          console.log(error);
        }
      } finally {
        setButtonState(false);
      }
    },
    [
      FirebaseErrors,
      changeUserProfile,
      crop.width,
      cropImage,
      inputValueState.photoUrl,
      inputValueState.userName,
      signInUser.uid,
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
