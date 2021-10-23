import { User } from "firebase/auth";

export type useAppTypes =  () => {
    signInUser: User | null;
    setSignInUser: React.Dispatch<React.SetStateAction<User | null>>;
}