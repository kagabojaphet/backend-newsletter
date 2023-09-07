import express from "express";
import userroutes from "./userroutes"

const router=express.Router()

router.use("/user",userroutes)

export default router