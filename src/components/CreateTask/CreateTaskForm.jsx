import React from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

const CreateTaskForm = ({
  title,
  setTitle,
  task,
  setTask,
  tests,
  setTests,
  handleSubmit,
  loading,
  functionName,
  setFunctionName,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "850px",
        maxWidth: "90%",
        margin: "40px auto 0 auto",
      }}
    >
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Создание нового задания
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Заголовок"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Подробности задания"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <TextField
            label="Название функции (test(a, b))"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            required
          />
          <TextField
            label="Тесты (assert название_функции(входные данные) == ожидаемый ответ, 'Expected: ожидаемый_ответ')"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={tests}
            onChange={(e) => setTests(e.target.value)}
            required
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading ? true : false}
            >
              Создать задание
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export default CreateTaskForm;
