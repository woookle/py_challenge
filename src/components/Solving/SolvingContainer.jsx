import useSolving from "../../hooks/useSolving";
import Solving from "./Solving";
import { Skeleton } from "@mui/material";

const SolvingContainer = () => {
  const { code, task, loading, handleCodeChange, sendCode, isTestCode, isCompletedTask } = useSolving();

  if (loading) {
    return (
      <Skeleton variant="rectangular" width="100%" height={400} sx={{ bgcolor: 'grey.900' }} />
    );
  }

  return (
    <Solving
      code={code}
      task={task}
      handleCodeChange={handleCodeChange}
      sendCode={sendCode}
      isTestCode={isTestCode}
      isCompletedTask={isCompletedTask}
    />
  );
};

export default SolvingContainer;