import { AcountUserTypes } from './typeSign';

export type useFirebaseTypes = (signUser: AcountUserTypes) => {
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
};
