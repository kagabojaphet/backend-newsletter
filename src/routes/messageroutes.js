import  express from "express";
import messagecontroller from "../controller/messagecontroller";

const router=express.Router()

router.post("/",messagecontroller.createmessage)
router.get("/",messagecontroller.getAllMessage)
router.delete("/",messagecontroller.deleteallmessage)

export default router