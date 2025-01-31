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
          backgroundColor: "white",
          minHeight: "110px"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2}}>
          <Avatar
            alt={user.username}
            src={`http://localhost:${import.meta.env.VITE_API_PORT}${user.avatar}`}
            sx={{ width: 60, height: 60 }}
          />
          <Box>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {user.username}
              </Typography>
              {user.role === 'admin' && <Typography fontSize={13} color="error" fontWeight="bold">[admin]</Typography>}
            </Box>
            <Typography
              variant="body1"
              color={"textSecondary"}
              component="div"
            >
              Уровень:
              <img
                src={`http://localhost:${import.meta.env.VITE_API_PORT}${user.levelIcon}`}
                alt="Уровень"
                style={{ verticalAlign: "middle", width: "25px", marginLeft: 5, borderRadius: "50%" }}
              />
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button variant="contained" onClick={() => {navigate(`/user/${user._id}`)}}>профиль</Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default User;
