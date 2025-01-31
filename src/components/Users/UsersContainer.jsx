import { Box, TextField, Typography } from "@mui/material";
import useGetUsers from "../../hooks/useGetUsers";
import Users from "./Users";
import { useNavigate } from "react-router-dom";

const UsersContainer = () => {
  const { filteredUsers, loading, searchTerm, setSearchTerm } = useGetUsers();
  const navigate = useNavigate();
  return (
    <>
      <Typography
        mt={3}
        mb={2}
        color="white"
        textAlign={"center"}
        fontWeight={"bold"}
        variant="h4"
      >
        Пользователи
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Поиск.."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "50%",
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
      </Box>
      <Users filteredUsers={filteredUsers} loading={loading} navigate={navigate} />
    </>
  );
};

export default UsersContainer;
