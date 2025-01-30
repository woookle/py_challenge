import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { BarLoader } from "react-spinners";

const Profile = ({ user, onLogout, onChangeAvatar, isUpdate }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        textAlign={"center"}
        mb={1}
        color="white"
      >
        Профиль
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <Box className="changeAvatarBlock">
            <Avatar
              alt={user.username}
              src={`http://localhost:${import.meta.env.VITE_API_PORT}${user.avatar}`}
              sx={{
                width: 100,
                height: 100,
                opacity: isUpdate ? 0 : 1,
                border: isUpdate ? "3px solid #000" : "none",
              }}
            />
            {isUpdate && (
              <Box className="loader_avatar">
                <BarLoader width={40} />
              </Box>
            )}
            <input
              type="file"
              id="new_avatar"
              accept="image/*"
              onChange={onChangeAvatar}
            />
            <label htmlFor="new_avatar">изменить</label>
          </Box>
          <Avatar
            alt="Level Icon"
            src={`http://localhost:${import.meta.env.VITE_API_PORT}${user.levelIcon}`}
            sx={{ width: 40, height: 40 }}
          />
        </Box>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            {user.username}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Логин: {user.email}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Очков: {user.exp}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Уровень: {user.level}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Выполненных заданий: {user.completedTasks.length}
          </Typography>
        </Box>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="secondary" onClick={onLogout}>
            Выйти из аккаунта
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
