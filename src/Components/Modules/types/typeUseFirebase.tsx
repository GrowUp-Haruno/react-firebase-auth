import { ChangeUserProfileTypes } from "./typeChangeUserProfile";
import { AcountUserTypes } from "./typeSign";

export type signTypes = (arg: AcountUserTypes) => Promise<void>;
export type changeUserProfileTypes = (arg: ChangeUserProfileTypes) => Promise<void>;

export type userSignOut = () => Promise<void>;


export type resetPasswordTypes = (arg: {
  email: string;
}) => Promise<void>

export type useFirebaseTypes = () => {
  signUp: signTypes;
  signIn: signTypes;
  userSignOut: userSignOut;
  changeUserProfile: changeUserProfileTypes;
  resetPassword: resetPasswordTypes;
};