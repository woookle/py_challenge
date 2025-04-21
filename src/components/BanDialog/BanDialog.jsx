import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const BanDialog = ({ open, onClose, onBan, reason, setReason, userProfileName, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          width: "640px",
          maxWidth: "none",
        },
      }}
    >
      <DialogTitle>Забанить игрока {userProfileName}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Причина бана"
          type="text"
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading ? true : false}>
          Отмена
        </Button>
        <Button onClick={onBan} color="error" disabled={loading ? true : false}>
          Забанить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BanDialog;
