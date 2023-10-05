import express from "express";
import userroutes from "./userroutes"
import messageroutes from "./messageroutes"
import newsroutes from "./newsroutes"
import commentroutes from "./commentroutes"
import categoryroutes from "./categoryroutes";


const router=express.Router()

router.use("/user",userroutes)
router.use("/message",messageroutes)
router.use("/news",newsroutes)
router.use("/comment",commentroutes)
router.use("/category",categoryroutes)


export default router