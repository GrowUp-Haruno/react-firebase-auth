// import { categoryType } from './typeChat';

export type ChangeUserProfileTypes = { userName: string; photoUrl: string };

// Realtime Databaseへの更新データの型定義
export type updatesTweetType = {
  [key: string]: {
    // uid: string;
    displayName: string;
    photoURL: string;
    // category: categoryType;
    // tweet: string;
  };
};
export type usersUpdatesType = {
  [key: string]: {
    lastUpdate: object;
    updateCount: number;
  };
};
