import express from "express";
import usercontroller from "../controller/usercontroller";

const router=express.Router()

router.post("/use",usercontroller.createruser)

export default router