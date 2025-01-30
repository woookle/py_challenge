import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { CheckCircle, Send } from "@mui/icons-material";

const Solving = ({ code, task, handleCodeChange, sendCode, isTestCode, isCompletedTask }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{ p: 3, backgroundColor: isCompletedTask ? "#4caf50" : "background.paper", color: isCompletedTask ? "white" : "text.primary", transition: "all 0.3s ease" }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            {task.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Автор: {task.author?.username}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {task.task}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <CodeMirror
            value={code}
            height="400px"
            extensions={[python()]}
            onChange={(value) => handleCodeChange(value)}
            theme="dark"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            component={Link}
            to="/"
            variant={isCompletedTask ? "success" : "outlined"}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Назад
          </Button>
          {isCompletedTask ? (
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
                py: 1,
              }}
            >
              Решено
            </Button>
          ) : (
            <Button
              onClick={sendCode}
              variant="contained"
              endIcon={
                isTestCode ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Send />
                )
              }
              disabled={isTestCode}
              color="success"
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#333",
                },
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
                py: 1,
              }}
            >
              {isTestCode ? "Тестим..." : "Решить"}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Solving;
