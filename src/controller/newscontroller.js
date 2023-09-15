import news from "../model/news";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";
import  sendemail from "../utils/email"
import User from "../model/user";

class newscontroller{
    static async creaternews(req,res){
        const {newsmaintitle,newstitle,published,newssummary,newsdiscription,newsimage,publishername}=req.body
        const newsletter=await news.create({newsmaintitle,newstitle,published,newssummary,newsdiscription,newsimage,publishername})
        if(!newsletter){
            return errormessage(res,401,`no news found`)
        }
        else{
            const users=await User.find();
            users.map((usere)=>{
                sendemail(usere,newsletter)
            })

            return successmessage(res,201,`news sucessfuly sent`,newsletter)
        }
    }
    static async getallnews(req,res){
        const newsletter=await news.find()
        if(!newsletter || newsletter.length==0){
            return errormessage (res,401,`news not found`)
        }
        else{
            return successmessage(res,201,`news successfuly ${newsletter.length} retrieved`,newsletter)
        }
    }
    static async deleteallnews(req,res){
        const newsletter=await news.deleteMany()
        if(!newsletter){
            return errormessage(res,401,`no nesw deleted`)
        }
        else{
            return successmessage(res,200,`news successfuly deleted`)
        }
    }
    static async getonenews(req,res){
        const id=req.params.id
        const newsletter=await news.findById({_id:id})
        if(!newsletter){
            return errormessage(res,401,`news with id: ${id} not found`)
        }
        else{
            return successmessage(res,200,`user successfuly retrieved`,newsletter)
        }
    }

    static async deleteonenews(req,res){
        const id=req.params.id
        const newsletter=await news.findByIdAndDelete({_id:id})
        if(!newsletter){
            return errormessage(res,401,`news with id: ${id} not deleted`)
        }
        else{
            return successmessage(res,200,`news successfuly deleted`)
        }
    }

    static async updatenews(req,res){
        const id=req.params.id
        const newsletter=await news.findByIdAndUpdate(id,req.body,{new:true})
        if(!newsletter){
            return errormessage(res,401,`no news with id: ${id} not found`)
        }
        else{
            return successmessage(res,200,`news successfuly update`,newsletter)
        }
    }

    static async like(req,res){
        const id=req.params.id
        const newslikes=await news.findById(id)
        if(!newslikes){
            return errormessage(res,401,`news not found`)
        }
        else{
            newslikes.likes += 1;
            await newslikes.save();
            return successmessage(res,200,`you liked ${newslikes.likes}`,newslikes)
        }
    }

    static async dislike(req,res){
        const id=req.params.id
        const newslikes=await news.findById(id)
        if(!newslikes){
            return errormessage(res,401,`news not found`)
        }
        else{
            newslikes.dislikes += 1;
            await newslikes.save();
            return successmessage(res,200,`you disliked ${newslikes.dislikes}`,newslikes)
        }
    }
}
export default newscontroller