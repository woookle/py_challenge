import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyStats } from "../api/api";

const useGetStats = () => {
  const [completedTasks, setTasks] = useState([]);
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function getStats() {
      try {
        setLoading(true);
        const response = await getMyStats();
        setTasks(response.data.tasks);
        setRemainingPoints(response.data.remainingExp)
      } catch (error) {
        toast.error('Ошибка при выводе статистики!')
      } finally {
        setLoading(false)
      }
    }
    getStats();
  }, [])

  return { completedTasks, remainingPoints, loading }
}

export default useGetStats;