import  express  from "express";
import categorycontroller from "../controller/categorycontroller";
import verifyaccess from "../middlewares/verifyaccess";

const router=express.Router()

router.post("/",categorycontroller.createcategory)
router.get("/",verifyaccess("admin"),categorycontroller.getallcategory)


export default router