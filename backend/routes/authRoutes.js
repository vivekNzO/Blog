import express from 'express'
import { handleLogin, handleLogout, handleSignUp } from '../controllers/authControllers.js';

const router = express.Router();

router.post("/signup",handleSignUp)
router.post("/login",handleLogin)
router.post("/logout",handleLogout)

export default router