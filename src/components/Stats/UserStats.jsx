import React from 'react';
import { Container, Typography, LinearProgress, Paper, List, ListItem, ListItemText, Avatar, Box } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';


const UserStats = ({ user, completedTasks, remainingPoints }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" my={4}>
        <Avatar alt={user.username} src={`http://localhost:${import.meta.env.VITE_API_PORT}${user.avatar}`} sx={{ width: 56, height: 56, mr: 2 }} />
        <Typography variant="h4">{user.username}</Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Уровень: {user.level}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Очков: {user.exp}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Прогресс до следующего уровня:
      </Typography>
      <LinearProgress variant="determinate" value={remainingPoints} sx={{ height: 10, borderRadius: 5 }} />

      <Typography variant="h6" gutterBottom mt={4}>
        Выполненные задания:
      </Typography>
      <List>
        {completedTasks.map((task, index) => (
          <Paper key={index} sx={{ mb: 2, p: 2 }}>
            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
              <ListItemText primary={`Задание: ${task.taskID.title}`} />
              <ListItemText primary={`Описание: "${task.taskID.task}"`} />
            </ListItem>
            <CodeMirror
              value={task.answer}
              height="auto"
              extensions={[python()]}
              editable={false}
            />
          </Paper>
        ))}
      </List>
      </Paper>
    </Container>
  );
};

export default UserStats;