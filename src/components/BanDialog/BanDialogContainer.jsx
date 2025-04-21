import { useState } from "react";
import BanDialog from "./BanDialog";
import { Button } from "@mui/material";
import { banUser } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BanDialogContainer = ({ userProfile }) => {
  const [reason, setReason] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleBanPlayer = async () => {
    try {
      setLoading(true)
      await banUser(userProfile._id, reason);
      toast.success(`Пользователь <${userProfile.username}> был забанен по причине '${reason}'`)
      navigate('/users')
    } catch (error) {
      toast.error('Ошибка при бане пользователя!')
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        Забанить
      </Button>
      <BanDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onBan={handleBanPlayer}
        reason={reason}
        setReason={setReason}
        userProfileName={userProfile.username}
        loading={loading}
      />
    </>
  );
};

export default BanDialogContainer;
