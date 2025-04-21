import { Button } from "@mui/material";
import UserBanDialog from "./UserBanDialog";
import { useState } from "react";

const UserBanDialogContainer = ({ user }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          setOpen(true);
        }}
      >
        профиль
      </Button>
      <UserBanDialog open={open} onClose={onClose} user={user} />
    </>
  );
};

export default UserBanDialogContainer;
