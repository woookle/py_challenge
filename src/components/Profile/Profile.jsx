import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { BarLoader } from "react-spinners";
import { Edit, InsertPhoto } from "@mui/icons-material";

const Profile = ({
  user,
  onLogout,
  onChangeAvatar,
  onChangeBackground,
  onChangeUsername,
  isUpdate,
  isEditing,
  newUsername,
  handleCancelClick,
  handleEditClick,
  setNewUsername,
}) => {
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
      <Paper
        elevation={3}
        sx={{
          p: 3,
          position: "relative",
          background:
            user.background == "default"
              ? "#fff"
              : `url(http://localhost:${import.meta.env.VITE_API_PORT}${
                  user.background
                })`,
          backgroundSize: "cover"
        }}
      >
        <IconButton
          aria-label="upload background"
          component="label"
          sx={{
            backgroundColor: "#fff",
            position: "absolute",
            right: "30px",
            top: "30px",
          }}
        >
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={onChangeBackground}
          />
          <InsertPhoto />
        </IconButton>
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
              src={`http://localhost:${import.meta.env.VITE_API_PORT}${
                user.avatar
              }`}
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
            src={`http://localhost:${import.meta.env.VITE_API_PORT}${
              user.levelIcon
            }`}
            sx={{ width: 40, height: 40 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "15px",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {isEditing ? (
              <>
                <TextField
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  variant="outlined"
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onChangeUsername}
                >
                  Сохранить
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelClick}
                >
                  Отмена
                </Button>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  fontWeight="bold"
                >
                  {user.username}
                </Typography>
                {user.role === "admin" && (
                  <Typography fontSize={13} color="error" fontWeight="bold">
                    [admin]
                  </Typography>
                )}
                <IconButton onClick={handleEditClick} color="#000" >
                  <Edit />
                </IconButton>
              </>
            )}
          </Box>
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
