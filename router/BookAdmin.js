import express from "express";
import {
         BookAll
      } from "../controllers/BookController.js";
import upload from "../middleware/Muter.js";

const router = express.Router();

router.get("/",BookAll);
router.get("/",BookAll);

export default router