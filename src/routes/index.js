import express from "express";
import userroutes from "./userroutes"
import messageroutes from "./messageroutes"

const router=express.Router()

router.use("/user",userroutes)
router.use("/message",messageroutes)


export default router