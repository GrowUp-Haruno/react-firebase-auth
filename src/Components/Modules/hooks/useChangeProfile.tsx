import { useToast } from '@chakra-ui/react';
import { User } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import {
  child,
  DataSnapshot,
  equalTo,
  onValue,
  orderByChild,
  query,
  ref as dbRef,
  serverTimestamp,
  update,
} from 'firebase/database';
import { getDownloadURL, ref, UploadMetadata, uploadString } from 'firebase/storage';
import { ChangeEventHandler, FormEventHandler, useCallback, useState } from 'react';
import { avatarStorageUrl, database, storage } from '../../../firebase';
import {
  ChangeUserProfileTypes,
  updatesTweetType,
  usersUpdatesType,
} from '../types/typeChangeUserProfile';
import { useFirebase } from './useFirebase';
import { useFirebaseErrors } from './useFirebaseErrors';
import { useForm } from './useForm';

/**
 * User型を持つユーザー情報を渡すとChangeProfileコンポーネントに必要な変数を返す関数
 * @param signInUser User型を持つユーザー情報
 * @returns ChangeProfileコンポーネントに必要な変数
 */
export const useChangeProfile = (signInUser: User) => {
  // 更新間隔[分]
  const updateInterval: number = 1;

  // 連続更新の制限回数
  const numberOfLimits: number = 3;

  //  各種メッセージの表示コンポーネント
  const toast = useToast();

  // 切り取り範囲の幅と高さ
  const cropSize = 96;

  //  ローカルイメージファイルの読み取り結果(DataUrl(base64))
  const [imgSrc, setImgSrc] = useState<string>('');
  const [image, setImage] = useState<HTMLImageElement>();
  const [cropImage, setCropImage] = useState<string>('');

  // 切り取り設定の初期値
  const cropInitial = { aspect: 1 };

  // 切り取りの各種設定
  const [crop, setCrop] = useState<ReactCrop.Crop>(cropInitial);

  const [buttonState, setButtonState] = useState<boolean>(false);

  const { FirebaseErrors } = useFirebaseErrors();

  const { changeUserProfile } = useFirebase();

  const UserProfile: ChangeUserProfileTypes = {
    userName: signInUser.displayName ? signInUser.displayName : '',
    photoUrl: signInUser.photoURL ? signInUser.photoURL : '',
  };

  // フォームの入力値とonChangeハンドラ
  const { inputValueState, handleChangeObjectState } = useForm<ChangeUserProfileTypes>(
    UserProfile,
    changeUserProfile
  );

  /**
   * - [ファイルを選択]でファイルを選択した際に発火
   * - DataUrl(base64)の読み込まれると、ImgSrcステートにセットされる
   */
  const handleSetImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const reader = new FileReader();
      const file = event.target.files![0];
      setCrop(cropInitial);
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target !== null && ev.target.result !== null) {
          setImgSrc(ev.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  //ReatCropのonDragEnd(ドラッグ操作終了時)に抜き出した範囲をDataURIに変換してCropImageへセット
  const getCroppedImg = useCallback(() => {
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

  // ReactCropのonChangeハンドラ
  const handleReactCrop = useCallback((newCrop: ReactCrop.Crop) => setCrop(newCrop), []);

  // BlobからFirebase Storageへアップロード
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
         * 前回の更新から1分超過、または更新回数が1分未満の内に規定回数以下なら更新を許可する
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
                }
                // 更新条件の規定値を超えた場合、FirebaseErrorを返す
                else {
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

        // 画像を切り取っている
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

          const snapshot = await new Promise<DataSnapshot>((resolve) =>
            onValue(messagesQuery, resolve, { onlyOnce: true })
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
        }
        // 画像を切り取っていない
        else {
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
