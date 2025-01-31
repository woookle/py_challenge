import Profile from "./Profile";
import useGetProfile from "../../hooks/useGetProfile";
import useChangeProfile from "../../hooks/useChangeProfile";

const ProfileContainer = () => {
  const { user, onLogout } = useGetProfile();
  const {
    onChangeAvatar,
    onChangeBackground,
    onChangeUsername,
    isUpdate,
    isEditing,
    newUsername,
    handleCancelClick,
    handleEditClick,
    setNewUsername,
  } = useChangeProfile();

  return (
    <Profile
      user={user}
      onLogout={onLogout}
      onChangeAvatar={onChangeAvatar}
      onChangeBackground={onChangeBackground}
      onChangeUsername={onChangeUsername}
      isUpdate={isUpdate}
      isEditing={isEditing}
      newUsername={newUsername}
      handleCancelClick={handleCancelClick}
      handleEditClick={handleEditClick}
      setNewUsername={setNewUsername}
    />
  );
};

export default ProfileContainer;
