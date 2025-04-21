import { Box, Fade, Grid, TextField, Typography } from "@mui/material";
import BannedUser from "./blocks/BannedUser";
import { BarLoader } from "react-spinners";
import { Cancel } from "@mui/icons-material";

const BannedUsers = ({ banlist, loading, filter, setFilter }) => {
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BarLoader color="white" />
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography mt={3} mb={2} color="white" variant="h4" fontWeight={"bold"}>
        Банлист
      </Typography>
      <TextField
        id="outlined-basic"
        label="Поиск.."
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{
          width: "50%",
          mb: "24px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-input": {
            color: "white",
          },
        }}
      />
      {banlist.length === 0 ? (
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <Cancel sx={{ fontSize: 32 }} />
            <Typography variant="h6" sx={{ ml: 1 }}>
              Баны не найдены
            </Typography>
          </Box>
        </Fade>
      ) : (
        <Grid container spacing={1}>
          {banlist.map((user, index) => (
            <BannedUser user={user} key={index} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BannedUsers;
