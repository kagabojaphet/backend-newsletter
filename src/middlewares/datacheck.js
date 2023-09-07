//check all error
import  express  from "express";
import User from "../model/user";
import errormessage from "../utils/errormessage";

class datacheck{
    static userRegisterIsEmpty(req,res,next){
        const {firstname,lastname,email,password}=req.body
        if(firstname==""){
            return errormessage (res,401,`please write fristname properly`)
        }
        else if(lastname==""){
            return errormessage (res,401,`please write lastname properly`)
        }
        else if(email==""){
            return errormessage (res,401,`please write email properly`)
        }
        else if(password==""){
            return errormessage (res,401,`please write password porperly`)
        }
        else{
            return next()
        }
    }

    static async emailExist(req,res,next){
        const email=req.body.email
        const user=await User.findOne({email})
        if(user){
            return errormessage (res,401,`user already exist`)
        }
        else{
            return next()
        }
    }
}
export default datacheck