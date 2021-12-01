// カテゴリを追加する場合、この型定義をUnion Typeで定義すること
type categoryType = 'オープン';

// Realtime Databaseへの更新データの型定義
export type updatesType = {
  [key: string]: {
    uid: string;
    displayName: string;
    photoURL: string;
    category: categoryType;
    tweet: string;
  };
};

export type useChatViewType = (category: categoryType) => {
  snapshotVal: updatesType;
};

// Propの型定義
export type ChatViewPropType = {
  category: categoryType;
};