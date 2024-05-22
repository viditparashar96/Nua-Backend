import express from "express";
import {
  Login,
  Logout,
  Register,
  getCurrentUser,
} from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/currentUser").get(AuthMiddleware, getCurrentUser);
module.exports = router;
