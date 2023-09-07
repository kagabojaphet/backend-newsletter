
import errormessage from "../utils/errormessage";
import  expressValidator  from "express-validator";
import Jwt,{JsonWebTokenError}  from "jsonwebtoken";


const verifyaccess=(req,res,next)=>{
    const token=req.headers["kiki-token"]
    if(!token){
        return errormessage(res,401,`no token provided`)
    }else{
        try{
        const verifytoken=Jwt.verify(token,process.env.SCRET_KEY,{expiresIn:"1d"})
        if(verifytoken.role!=="admin"){
            return errormessage(res,401,`have not access`)
        }
        else{
            
                return next()
        }
        }
        catch(error){
         if(error=JsonWebTokenError){
            return errormessage(res,401,`invalid token`)
         }
        }
    }
}
export default verifyaccess