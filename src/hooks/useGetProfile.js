import { useDispatch, useSelector } from "react-redux";
import { avatar, background, logoutFromAcc, username } from "../api/userAPI";
import { toast } from "react-toastify";

const useGetProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onLogout = () => {
    try {
      dispatch(logoutFromAcc());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { user, onLogout };
};

export default useGetProfile;
