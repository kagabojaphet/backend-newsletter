
import Comment from "../model/comments"
import news from "../model/news"
import errormessage from "../utils/errormessage"
import successmessage from "../utils/successmessage";


class commentcontroller{
    static async createcomment(req,res){
    const newsidparams=req.params.id;
    req.body.user=req.user._id;
    const comment=await Comment.create(req.body)
    const newes=await news.findByIdAndUpdate({_id:newsidparams},{$push:{comment:comment}},{new:true})
    if(!newes){
        return errormessage(res,401,`no news found`)    
    }
    else{
        return successmessage(res,200,`comment successfuly created`,newes)
    }
    }
    static async getallcomment(req,res){
        const comment=await Comment.find()
        if(!comment){
            return errormessage(res,401,`comment not found`)
        }
        else{
            return successmessage(res,200,`all ${comment.length} comments`,comment)
        }
    }
    static async deleteonecomment(req,res){
        const id=req.params.id
        const comment=await Comment.findByIdAndDelete({_id:id})
        if(!comment){
            return errormessage(res,401,`comment not deleted`)
        }
        else{
            return successmessage(res,200,`comment successfuly deleted`)
        }
    }

}
export default commentcontroller