import { useSelector } from "react-redux";
import {
  selectCurrentMerchant,
  selectCurrentMerchantToken,
} from "../features/auth/authSlice";
import { useMemo } from "react";

export const useAuth = () => {
  const user = useSelector(selectCurrentMerchant);
  const token = useSelector(selectCurrentMerchantToken);
  //   console.log("User", user);
  //   console.log("Token", token);
  // console.log("Permissions", permissions)
  return useMemo(() => ({ user, token }), [user, token]);
};
