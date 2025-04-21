import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import checkMainAdminRole from "../middleware/checkMainAdminRole.js";
import { assignAdminRole } from "../controllers/adminController.js";

const router = express.Router();
router.use(checkAuth, checkMainAdminRole)

router.patch('/admin/role/:id', assignAdminRole);
router.patch('/admin/downgrade/:id', downgradeAdmin);

export default router;