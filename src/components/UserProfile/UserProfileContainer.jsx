import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById } from "../../api/api";
import UserProfile from "./UserProfile";
import { BarLoader } from "react-spinners";

const UserProfileContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ userProfile, setUserProfile ] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getUserProfile() {
      try {
        setLoading(true);
        const response = await getUserById(id);
        setUserProfile(response.data.user);
      } catch (error) {
        toast.error('Ошибка при выводе пользователя!')
      } finally {
        setLoading(false)
      }
    }
    getUserProfile();
  }, [id])
  
  if (loading) {
    return (
      <div style={{width: "100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <BarLoader color="white" />
      </div>
    );
  }

  return (
    <UserProfile userProfile={userProfile} navigate={navigate} />
  )
}

export default UserProfileContainer;