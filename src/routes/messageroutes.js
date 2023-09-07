import  express from "express";
import messagecontroller from "../controller/messagecontroller";

const router=express.Router()

router.post("/",messagecontroller.createmessage)

export default router