import { useEffect, useState } from "react";
import { getTasks } from "../api/api";
import { toast } from "react-toastify";

const useGetTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getterTasks() {
      try {
        setLoading(true);
        const response = await getTasks();
        setTasks(response.data.tasks);
        setFilteredTasks(response.data.tasks);
      } catch (error) {
        toast.error('Ошибка при загрузке задач!');
      } finally {
        setLoading(false);
      }
    }
    getterTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [filter, tasks]);

  return { filteredTasks, loading, filter, setFilter };
};

export default useGetTasks;