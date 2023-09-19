import  express from "express";
import messagecontroller from "../controller/messagecontroller";
import verifyaccess from "../middlewares/verifyaccess";

const router=express.Router()

router.post("/",verifyaccess("user"),messagecontroller.createmessage)
router.get("/",verifyaccess("admin"),messagecontroller.getAllMessage)
router.delete("/",verifyaccess("admin"),messagecontroller.deleteallmessage)

export default router