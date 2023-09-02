import express from "express";
import userroutes from "./userroutes"

const router=express.Router()

router.use("/",userroutes)

export default router