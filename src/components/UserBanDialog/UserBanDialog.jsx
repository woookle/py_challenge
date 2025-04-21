import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Button,
  Typography,
} from "@mui/material";

const UserBanDialog = ({ open, onClose, user }) => {
  if (!user) {
    return null;
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div
        style={{
          background:
            user.background === "default"
              ? "#000"
              : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("http://localhost:${
                  import.meta.env.VITE_API_PORT
                }${user.background}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 3,
        }}
      >
        <DialogTitle>
          <Typography
            variant="h4"
            component="div"
            style={{ fontWeight: "bold" }}
          >
            {user.username}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Avatar
              src={`http://localhost:${import.meta.env.VITE_API_PORT}${user.avatar}`}
              alt={user.username}
              style={{ width: 64, height: 64, marginRight: 2 }}
            />
            <Typography variant="h6">Уровень: {user.level}</Typography>
          </div>
          <Typography
            variant="body1"
            style={{ marginBottom: 1 }}
          >
            <strong>Причина бана:</strong> {user.reason}
          </Typography>
          <Typography variant="body1">
            <strong>Забанен админом:</strong> {user.byAdmin}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Назад
          </Button>
          <Button
            onClick={() => alert(`${user.username} разбанен!`)}
            color="primary"
          >
            Разбанить
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default UserBanDialog;