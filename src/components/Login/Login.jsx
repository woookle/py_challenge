import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Login = ({ email, password, setEmail, setPassword, handleLogin }) => {
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
        Вход
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
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
          id="email"
          label="Логин"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
            width: "50%",
          }}
        >
          Войти
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <Typography variant="body2">Нет аккаунта?</Typography>
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
            <Link to={'/register'} style={{textDecoration: "none", color: "black"}}>Зарегистрироваться</Link>
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;