import express from 'express';
import { changeAvatar, changeBackground, changeUsername, getMe, getUserById, getUsers, login, logout, myStats, register } from '../controllers/userController.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';
import { loginValidation, registerValidation } from '../configs/validation.js';
import checkAuth from '../middleware/checkAuth.js';
import upload from '../configs/multerConfig.js';

const router = express.Router();

router.post("/auth/login", loginValidation, handleValidationErrors, login);
router.post("/auth/register", registerValidation, handleValidationErrors, register);
router.post('/auth/logout', checkAuth, logout);

router.patch("/auth/change_avatar", checkAuth, upload.fields([{ name: "avatar", maxCount: 1 }]), changeAvatar)
router.patch("/auth/change_background", checkAuth, upload.fields([{ name: "background", maxCount: 1 }]), changeBackground)
router.patch("/auth/change_username", checkAuth, changeUsername)

router.get("/auth/get_me", checkAuth, getMe);
router.get("/auth/get_stats", checkAuth, myStats);
router.get("/", getUsers)
router.get('/:id', getUserById)

export default router;