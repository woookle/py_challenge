import { Avatar, Box, Typography, Grid, Button } from "@mui/material";

const User = ({ user, index, navigate }) => {
  return (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          background:
            user.background === "default"
              ? "black"
              : `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("http://localhost:${
                  import.meta.env.VITE_API_PORT
                }${user.background}")`,
          backgroundSize: "cover",
          minHeight: "110px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box position={"relative"}>
            <Avatar
              alt={user.username}
              src={`http://localhost:${import.meta.env.VITE_API_PORT}${
                user.avatar
              }`}
              sx={{ width: 60, height: 60 }}
            />
            <img
              src={`http://localhost:${import.meta.env.VITE_API_PORT}${
                user.levelIcon
              }`}
              alt="Уровень"
              style={{
                position: "absolute",
                bottom: "-3px",
                right: "-3px",
                width: "25px",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box>
            <Box>
              <Typography variant="h5" fontWeight="bold" color="white">
                {user.username}
              </Typography>
              {user.role === "admin" && (
                <Typography fontSize={13} color="error" fontWeight="bold">
                  [Админ]
                </Typography>
              )}
              {user.role === 'mainAdmin' && (
                <Typography fontSize={13} color="#9400d3" fontWeight="bold">
                  [Гл. Админ]
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => {
              navigate(`/user/${user._id}`);
            }}
          >
            профиль
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default User;
