
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

}
export default commentcontroller