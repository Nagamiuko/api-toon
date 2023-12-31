import express from "express";
import {UserAddress , allAddress , UserUpdataAddress ,OneAddress ,DeletAddress} from '../controllers/ADDAddress.js'
const router = express.Router();

router.post("/user/add/address/:userid",UserAddress);
router.post("/all-addressuser/:userid",allAddress);
router.put("/user-updata-addres/:adreid",UserUpdataAddress);
router.post("/user-addres/:adreid",OneAddress);
router.delete("/user-delete-addres/:adreid",DeletAddress);

export default router