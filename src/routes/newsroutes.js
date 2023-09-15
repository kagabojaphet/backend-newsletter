import express  from "express";
import newscontroller from "../controller/newscontroller";

const router=express.Router()

router.post("/",newscontroller.creaternews)
router.get("/",newscontroller.getallnews)
router.get("/:id",newscontroller.getonenews)
router.delete("/",newscontroller.deleteallnews)
router.delete("/:id",newscontroller.deleteonenews)
router.patch("/:id",newscontroller.updatenews)
router.put("/like/:id",newscontroller.like)
router.put("/dislike/:id",newscontroller.dislike)

export default router