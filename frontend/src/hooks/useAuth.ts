import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentUserToken } from "../features/auth/authSlice";
import { useMemo } from "react";

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentUserToken);
  //   console.log("User", user);
  //   console.log("Token", token);
  return useMemo(() => ({ user, token }), [user, token]);
};
