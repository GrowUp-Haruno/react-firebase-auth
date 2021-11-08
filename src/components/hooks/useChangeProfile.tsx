import { User } from "firebase/auth";
import { ChangeUserTypes } from "../types/typeSign";
import { useHandleSubmitToFirebase } from "./useHandleSubmitToFirebase";
import { useSign } from "./useSign";


export const useChangeProfile = () => {
  const [
    initialSignInUser,
    signInUser,
    setSignInUser,
    isDesable,
    setIsDesable,
    handleChangeObjectState,
  ] = useSign();

  const { handleSubmitToFirebase } = useHandleSubmitToFirebase<ChangeUserTypes>(
    initialSignInUser,
    setSignInUser,
    setIsDesable,
    useFirebase().,
    signInUser
  );

return { signInUser, isDesable, handleChangeObjectState, handleSubmitToFirebase };

};
