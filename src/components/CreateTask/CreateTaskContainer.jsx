import { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import { createTask } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateTaskContainer = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [tests, setTests] = useState("");
  const [loading, setLoading] = useState(false);
  const [functionName, setFunctionName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createTask({ title, task, tests, functionName });
      toast.success(`Задача "${response.data.task.title}" успешно создана!`);
      navigate('/')
    } catch (error) {
      toast.error('Ошибка при создании задачи!')
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateTaskForm
      title={title}
      setTitle={setTitle}
      task={task}
      setTask={setTask}
      tests={tests}
      setTests={setTests}
      handleSubmit={handleSubmit}
      loading={loading}
      functionName={functionName}
      setFunctionName={setFunctionName}
    />
  );
};

export default CreateTaskContainer;
