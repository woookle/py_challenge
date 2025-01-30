import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Done } from "@mui/icons-material";

const Task = ({ task, isComplete }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isComplete ? "#4caf50" : "white",
        color: isComplete ? "white" : "black",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        width: "100%",
        mb: 2,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          alt={task.author.username}
          src={`http://localhost:${import.meta.env.VITE_API_PORT}${task.author.avatar}`}
          sx={{ width: 40, height: 40 }}
        />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {task.title}
          </Typography>
          <Typography
            variant="body2"
            color={isComplete ? "white" : "textSecondary"}
          >
            Автор:{" "}
            <Link
              to={`/user/${task.author._id}`}
              style={{
                color: isComplete ? "white" : "rgba(0, 0, 0, 0.6)",
                textDecoration: "none",
              }}
            >
              {task.author.username}
            </Link>
          </Typography>
        </Box>
      </Box>

      {isComplete ? (
        <Done />
      ) : (
        <Button
          component={Link}
          to={`/task/${task._id}`}
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            py: 1,
          }}
        >
          Попробовать
        </Button>
      )}
    </Box>
  );
};

export default Task;
