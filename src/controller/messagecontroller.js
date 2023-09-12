import errormessage from "../utils/errormessage";
import mmessage from "../model/message";
import successmessage from "../utils/successmessage";

class messagecontroller{
    static async createmessage(req,res){
        try {
            const mssg=await mmessage.create(req.body)
            return res.status(201).json({
                message:`message was sent`,
                data:{
                    email:mssg.email,
                    delvary:mssg.message
                }
            })
        } catch (error) {
            
        }
    }
        static async getAllMessage(req,res){
            const mssg=await mmessage.find()
            if(!mssg || mssg.length==0){
                return errormessage(res,401,`no message found`)
            }else{
                return successmessage(res,200,`message ${mssg.length} successfuly retrieved`,mssg)
            }
    
        }

   
    static async  deleteallmessage(req,res){
      const mssg=await mmessage.deleteMany();
      if(!mssg){
        return errormessage(res,401,`no message deleted`)
      }  
      else{
        return successmessage(res,200,`all message deleted`)
      }
    }
}
export default messagecontroller