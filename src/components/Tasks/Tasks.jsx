import React from "react";
import Task from "./Blocks/Task";
import { Box, Fade, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { BarLoader } from "react-spinners";

const Tasks = ({ tasks, loading, completedTasks }) => {
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BarLoader color="white" />
      </div>
    );
  }

  return (
    <div>
      <ul>
        {tasks.length === 0 ? (
          <Fade in={true} timeout={500}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              <Cancel sx={{ fontSize: 32 }} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Задачи не найдены
              </Typography>
            </Box>
          </Fade>
        ) : (
          tasks.map((t) => {
            const completedTask = completedTasks.find((ct) => ct.taskID === t._id);
            const isComplete = !!completedTask;
            return (
              <Task
                key={t._id}
                task={t}
                isComplete={isComplete}
              />
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Tasks;
