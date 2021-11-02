import { User } from 'firebase/auth';

export type useAppTypes = () => {
  signInUser: User | null;
};
