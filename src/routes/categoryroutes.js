import  express  from "express";
import categorycontroller from "../controller/categorycontroller";

const router=express.Router()

router.post("/",categorycontroller.createcategory)
router.get("/",categorycontroller.getallcategory)


export default router