import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { avatar, background, username } from "../api/userAPI";

const useChangeProfile = () => {
  const user = useSelector((state) => state.auth.user.username);
  const isUpdate = useSelector((state) => state.auth.isUpdate);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user);
  const dispatch = useDispatch();

  const onChangeAvatar = (new_avatar) => {
    try {
      const formData = new FormData();
      formData.append("avatar", new_avatar.target.files[0]);
      dispatch(avatar(formData));
    } catch (error) {
      toast.error("Ошибка при изменении!");
    }
  };

  const onChangeBackground = (new_background) => {
    try {
      const formData = new FormData();
      formData.append("background", new_background.target.files[0]);
      dispatch(background(formData));
    } catch (error) {
      toast.error("Ошибка при изменении!");
    }
  };

  const onChangeUsername = () => {
    try {
      dispatch(username(newUsername));
      setIsEditing(false);
    } catch (error) {
      toast.error("Ошибка при изменении!");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setNewUsername(user);
    setIsEditing(false);
  };

  return {
    onChangeAvatar,
    onChangeBackground,
    onChangeUsername,
    isUpdate,
    isEditing,
    newUsername,
    handleCancelClick,
    handleEditClick,
    setNewUsername,
  };
};

export default useChangeProfile;
