import React from "react";
import { Box, Button, Paper, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Register = ({ handleRegister, username, setUsername, email, setEmail, password, setPassword, showPassword, handleClickShowPassword }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        mt: 8,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "360px",
        maxWidth: "90%",
        margin: "80px auto 0 auto",
      }}
    >
      <Typography component="h1" variant="h5" color="black" fontWeight={"bold"}>
        Регистрация
      </Typography>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          mt: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Имя пользователя"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Логин"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Зарегистрироваться
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 2,
        }}
      >
        <Typography variant="body2">Есть аккаунт?</Typography>
        <Button
          variant="text"
          sx={{
            color: "black",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          <Link to={'/login'} style={{ textDecoration: "none", color: "black" }}>Войти</Link>
        </Button>
      </Box>
    </Paper>
  );
};

export default Register;
