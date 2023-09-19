import express  from "express";
import newscontroller from "../controller/newscontroller";
import verifyaccess from "../middlewares/verifyaccess";

const router=express.Router()

router.post("/",verifyaccess("admin"),newscontroller.creaternews)
router.get("/",newscontroller.getallnews)
router.get("/:id",newscontroller.getonenews)
router.delete("/",verifyaccess("admin"),newscontroller.deleteallnews)
router.delete("/:id",verifyaccess("admin"),newscontroller.deleteonenews)
router.patch("/:id",verifyaccess("admin"),newscontroller.updatenews)
router.put("/like/:id",newscontroller.like)
router.put("/dislike/:id",newscontroller.dislike)

export default router