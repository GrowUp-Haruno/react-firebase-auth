export type useFirebaseTypes = () => {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  userSignOut: () => Promise<void>;
};