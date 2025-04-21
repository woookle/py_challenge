import React from "react";
import { Typography, TextField, Box } from "@mui/material";
import useGetTasks from "../../hooks/useGetTasks";
import Tasks from "./Tasks";
import { useSelector } from "react-redux";

const TasksContainer = () => {
  const { filteredTasks, loading, filter, setFilter } = useGetTasks();
  const completedTasks = useSelector((state) => state.auth.user.completedTasks);

  return (
    <>
      <Typography
        mt={3}
        mb={2}
        color="white"
        textAlign={"center"}
        fontWeight={"bold"}
        variant="h4"
      >
        Задания
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Поиск.."
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            width: "50%",
            mb: "24px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-input": {
              color: "white",
            },
          }}
        />
      </Box>

      <Tasks
        tasks={filteredTasks}
        loading={loading}
        completedTasks={completedTasks}
      />
    </>
  );
};

export default TasksContainer;
