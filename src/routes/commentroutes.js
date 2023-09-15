import { verify } from "jsonwebtoken";
import commentcontroller from "../controller/commentcontroller";
import  express from "express";
import verifyaccess from "../middlewares/verifyaccess";

const router=express.Router()

router.post("/:id",verifyaccess("user"),commentcontroller.createcomment)

export default router