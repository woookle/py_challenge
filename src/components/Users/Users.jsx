import React from "react";
import { Box, Fade, Grid, Typography } from "@mui/material";
import User from "./Blocks/User";
import { Cancel } from "@mui/icons-material";
import { BarLoader } from "react-spinners";

const Users = ({ filteredUsers, loading, navigate }) => {
  if (loading) {
    return (
      <div style={{width: "100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <BarLoader color="white" />
    </div>
    );
  }

  return (
    <>
      {filteredUsers.length === 0 ? (
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              width: "100%",
              mt: 2,
            }}
          >
            <Cancel sx={{ fontSize: 32 }} />
            <Typography variant="h6" sx={{ ml: 1 }}>
              Пользователи не найдены
            </Typography>
          </Box>
        </Fade>
      ) : (
        <Grid container spacing={1}>
          {filteredUsers.map((user, index) => (
            <User user={user} key={index} navigate={navigate} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Users;
