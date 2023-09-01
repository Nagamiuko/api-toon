import express from "express";
import {verifyToken, verifyAdmin , verifyUser } from "../utils/verifyToken.js";
import {
  login,
  loginLine,
  registe,
  updateUser,
  UserDelete,
} from "../controllers/UserAuthController.js";
import uploadprofile from "../middleware/MuterUser.js";
const router = express.Router();

router.post("/register", registe);
router.post("/login", login);
router.post("/login-line", loginLine);
router.delete("/user/delete/:userid", UserDelete);
router.put("/updata/:userid",uploadprofile.single("image"), updateUser);


export default router;
