import { AcountUserTypes } from "./typeSign";

export type signTypes = (arg: AcountUserTypes) => Promise<void>;
export type changeUserProfileTypes = (userName: string, phoneNumber: string) => Promise<void>;

export type userSignOut = () => Promise<void>;

export type useFirebaseTypes = () => {
  signUp: signTypes;
  signIn: signTypes;
  userSignOut: userSignOut;
  changeUserProfile: changeUserProfileTypes;
};
