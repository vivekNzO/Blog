import express from 'express'
import { handleLogin, handleLogout, handleMe, handleSignUp } from '../controllers/authControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/signup",handleSignUp)
router.post("/login",handleLogin)
router.post("/logout",handleLogout)
router.get("/me",authMiddleware,handleMe)

export default router