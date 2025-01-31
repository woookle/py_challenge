import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Button,
} from "@mui/material";

const UserProfile = ({ userProfile, navigate }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        textAlign={"center"}
        mb={1}
        color="white"
      >
        Пользователь
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          background:
            userProfile.background == "default"
              ? "#fff"
              : `url(http://localhost:${import.meta.env.VITE_API_PORT}${
                  userProfile.background
                })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <Avatar
            alt={userProfile.username}
            src={`http://localhost:${import.meta.env.VITE_API_PORT}${
              userProfile.avatar
            }`}
            sx={{ width: 100, height: 100 }}
          />
          <Avatar
            alt="Level Icon"
            src={`http://localhost:${import.meta.env.VITE_API_PORT}${
              userProfile.levelIcon
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
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              {userProfile.username}
            </Typography>
            {userProfile.role === "admin" && (
              <Typography fontSize={13} color="error" fontWeight="bold">
                [admin]
              </Typography>
            )}
          </Box>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Очков: {userProfile.exp}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Уровень: {userProfile.level}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Выполненных заданий: {userProfile.completedTasks?.length}
          </Typography>
        </Box>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              navigate(-1);
            }}
          >
            Назад
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
