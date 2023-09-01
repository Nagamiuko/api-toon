import express from "express";
import {verifyToken, verifyAdmin , isAuthenticated, verifyUser } from "../utils/verifyToken.js";
import {UserAll ,UserOne, getUserOne} from '../controllers/User.js'
const router = express.Router();


router.get("/", verifyAdmin ,UserAll);
router.get("/:userid", verifyAdmin ,UserOne);
router.get("/user",verifyUser,getUserOne);

export default router