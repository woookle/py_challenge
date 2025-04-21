import express from "express";
import checkAdminRole from "../middleware/checkAdminRole.js";
import checkAuth from "../middleware/checkAuth.js";
import { BanById, deleteTaskById, getBanlist, unBanById } from "../controllers/adminController.js";

const router = express.Router();
router.use(checkAuth, checkAdminRole)

router.get('/ban/list', getBanlist);
router.post('/ban/:id', BanById);
router.post('/unban/:id', unBanById);

router.delete('/task/:id', deleteTaskById);

export default router;