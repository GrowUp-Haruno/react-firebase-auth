import { User } from 'firebase/auth';

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

// ChatView関連の型定義
export type useChatViewType = (category: categoryType) => {
  snapshotVal: updatesType;
};
export type ChatViewPropType = {
  category: categoryType;
};

// ChatInput関連の型定義
export type useChatInputType = (
  signInUser: User,
  category: categoryType
) => {
  tweet: string;
  setTweet: React.Dispatch<React.SetStateAction<string>>;
  sendTweet: () => Promise<void>;
};
export type ChatInputPropType = {
  signInUser: User;
  onOpenChangeProfile: () => void;
};


//Chat関連の型定義
export type ChatType = { signInUser: User };