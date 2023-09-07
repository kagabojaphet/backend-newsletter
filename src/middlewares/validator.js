import { check,validationResult } from "express-validator";
import errormessage from "../utils/errormessage";

class Validator{
    static inputValidator(req,res,next){
        const error=validationResult(req)
      if(!error==error.isEmpty()){
        error.errors.map((err)=>{
            errormessage(res,401,err.msg)
          
        })
 
      }else{
        return next()
      }

    }
    static userAccountRule(){
        return [
            check("firstname","Please write your firstName correctly").trim().isAlpha(),
            check("lastname","please write your lastname correctly").trim().isAlpha(),
            check("email","PLease write your email correctly").trim().isEmail(),
            check("password","Provide strong password").trim().isStrongPassword()
        ]
    }

}
export default Validator
