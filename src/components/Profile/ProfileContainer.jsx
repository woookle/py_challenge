import { useSelector } from "react-redux"
import Profile from "./Profile"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { avatar, logoutFromAcc } from "../../api/userAPI"

const ProfileContainer = () => {
  const user = useSelector((state) => state.auth.user);
  const isUpdate = useSelector((state) => state.auth.isUpdate);
  const dispatch = useDispatch();

  const onLogout = () => {
    try {
      dispatch(logoutFromAcc());
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onChangeAvatar = (new_avatar) => {
    try {
      const formData = new FormData();
      formData.append("avatar", new_avatar.target.files[0]);
      dispatch(avatar(formData));
    } catch (error) {
      toast.error('Ошибка при изменении!')
    }
  }

  return (
    <Profile user={user} onLogout={onLogout} onChangeAvatar={onChangeAvatar} isUpdate={isUpdate} />
  )
}

export default ProfileContainer;