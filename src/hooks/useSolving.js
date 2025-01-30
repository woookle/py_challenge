import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../api/api";
import { useDispatch } from "react-redux";
import { successTask } from "../api/userAPI";
import { toast } from "react-toastify";

const useSolving = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const [isTestCode, setTestCode] = useState(false);
  const [isCompletedTask, setIsCompletedTask] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getTaskId() {
      try {
        setLoading(true);
        const response = await getTaskById(id);
        setTask(response.data);
        setCode(`def ${response.data.functionName}:\n\t#Удачи!`)
      } catch (error) {
        toast.error('Не удалось найти задание!');
      } finally {
        setLoading(false);
      }
    }
    getTaskId();
  }, [id])

  const sendCode = async () => {
    try {
      setTestCode(true);
      const response = await dispatch(successTask({ code: code, taskId: id })).unwrap();
      toast.success(response.message);
      if (response.isLevelUp) {
        setTimeout(() => {
          toast.info("Поздравляю! Вы повысили уровень!");
        }, 2000);
      }
      setIsCompletedTask(true);
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Задача решена неправильно!");
      }
    } finally {
      setTestCode(false);
    }
  };

  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  return { code, task, loading, handleCodeChange, sendCode, isTestCode, isCompletedTask }
}

export default useSolving;