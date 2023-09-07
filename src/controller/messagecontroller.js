import errormessage from "../utils/errormessage";
import mmessage from "../model/message";

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
}
export default messagecontroller