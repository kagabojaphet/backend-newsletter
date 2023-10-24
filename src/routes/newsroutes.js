import express  from "express";
import newscontroller from "../controller/newscontroller";
import verifyaccess from "../middlewares/verifyaccess";

const router=express.Router()

router.post("/",newscontroller.creaternews)
router.get("/",newscontroller.getallnews)
router.get("/:id",newscontroller.getonenews)
router.get("/search",newscontroller.searchcategory)
router.delete("/",verifyaccess("admin"),newscontroller.deleteallnews)
router.delete("/:id",verifyaccess("admin"),newscontroller.deleteonenews)
router.patch("/:id",verifyaccess("admin"),newscontroller.updatenews)
router.put("/like/:id",verifyaccess("user"),newscontroller.like)
router.put("/dislike/:id",verifyaccess("user"),newscontroller.dislike)

export default router