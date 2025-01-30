import { useSelector } from "react-redux";
import UserStats from "./UserStats";
import useGetStats from "../../hooks/useGetStats";

const UserStatsContainer = () => {
  const user = useSelector((state) => state.auth.user);
  const { completedTasks, remainingPoints } = useGetStats();
  return (
    <UserStats user={user} completedTasks={completedTasks} remainingPoints={remainingPoints} />
  )
}

export default UserStatsContainer;