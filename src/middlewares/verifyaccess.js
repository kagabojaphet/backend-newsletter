
import errormessage from "../utils/errormessage";
import Jwt,{JsonWebTokenError}  from "jsonwebtoken";


const verifyaccess=(passrole)=>{
  return (req,res,next)=>{
    const token=req.headers["kiki-token"]
 
    if(!token){
        return errormessage(res,401,`no token provided`)
    }else{
        try{
        const verifytoken=Jwt.verify(token,process.env.SCRET_KEY,{expiresIn:"1d"})
     
        req.user=verifytoken.user;
        
        if(passrole!==verifytoken.user.role){
            return errormessage(res,401,`have not access`)
        }
        return next()

        }
        catch(error){
        
         if(error.name=JsonWebTokenError){
            return errormessage(res,401,`invalid token`)
         }else{
            console.log(error)
         }
        }
    }
}}
export default verifyaccess