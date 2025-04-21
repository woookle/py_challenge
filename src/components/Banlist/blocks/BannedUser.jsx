import { Avatar, Box, Typography, Grid, Button } from "@mui/material";
import UserBanDialogContainer from "../../UserBanDialog/UserBanDialogContainer";

const BannedUser = ({ user, index }) => {
  return (
    <Grid item xs={12} sm={6} md={6} key={index}>
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
            </Box>
          </Box>
        </Box>
        <Box>
          {/* <UserBanDialogContainer user={user} /> */}
        </Box>
      </Box>
    </Grid>
  );
};

export default BannedUser;
