import express from "express";
import usercontroller from "../controller/usercontroller";
import datacheck from "../middlewares/datacheck";
import Validator from "../middlewares/validator";
import verifyaccess from "../middlewares/verifyaccess";

const router=express.Router()

router.post("/",
datacheck.userRegisterIsEmpty,
datacheck.emailExist,
Validator.userAccountRule(),
Validator.inputValidator,
usercontroller.createruser)
router.get("/",verifyaccess("admin"),usercontroller.getalluser)
router.get("/:id",usercontroller.getOneUser)
router.delete("/",verifyaccess("admin"),usercontroller.deletealluser)
router.delete("/:id",verifyaccess("admin"),usercontroller.deleteOneUser)
router.patch("/:id",verifyaccess("admin"),usercontroller.updateUser)
router.post("/login",usercontroller.loginuser)
export default router