import { errorMonitor } from "nodemailer/lib/xoauth2";
import Category from "../model/category";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";

class categorycontroller{
    static async createcategory(req,res){
        const category=await Category.create(req.body)
        if(!category){
            return errormessage(res,401,`category not found`)
        }
        else{
            return successmessage(res,200,`success category created`,category)
        }
    }
    static async getallcategory(req,res){
        const category=await Category.find()
        if(!category){
            return errormessage(res,401,`category not found`)
        }
        else{
            return successmessage(res,200,`category not successfuly retrieved`,category)
        }
    }
}

export default categorycontroller