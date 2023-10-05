import news from "../model/news";
import errormessage from "../utils/errormessage";
import successmessage from "../utils/successmessage";
import  sendemail from "../utils/email"
import User from "../model/user";
import Category from "../model/category";

class newscontroller{
    static async creaternews(req,res){
        const categoryid=req.body.category;
        const categorys=await Category.findById({_id:categoryid});
        if(!categorys){
            return errormessage(res,401,`no category with that id`)
        }
        const {newsmaintitle,newstitle,published,newssummary,newsdiscription,newsimage,publishername,category}=req.body
        const newsletter=await news.create({newsmaintitle,newstitle,published,newssummary,newsdiscription,newsimage,publishername,category})
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
            return successmessage(res,200,`news successfuly ${newsletter.length} retrieved`,newsletter)
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
             const userid=req.user._id
             if (newslikes.likes.includes(userid)){
                return errormessage(res,401,`news with id ${id} not found`)
             }
             else{
                if(newslikes.dislikes.includes(userid)){
                    newslikes.dislikes.pull(userid)
                }
                newslikes.likes.push(userid)
                newslikes.save()
                return successmessage(res,200,`like from ${req.user.firstname}`,newslikes)
             }
            // newslikes.likes += 1;
            // await newslikes.save();
            // return successmessage(res,200,`you liked ${newslikes.likes}`,newslikes)
        }
    }

    static async dislike(req,res){
        const id=req.params.id
        const newslikes=await news.findById(id)
        if(!newslikes){
            return errormessage(res,401,`news not found`)
        }
        else{
            const userid=req.user._id
            if(newslikes.likes.includes(userid)){
                newslikes.likes.pull(userid)
            }
            newslikes.dislikes.push(userid)
            newslikes.save()
            return successmessage(res,200,`dislike from ${req.user.firstname}`,newslikes)

            // newslikes.dislikes += 1;
            // await newslikes.save();
            // return successmessage(res,200,`you disliked ${newslikes.dislikes}`,newslikes)
        }
    }
    //search
    static async searchcategory(req,res) {
        const searchcategorynews = req.query.category;
        console.log(searchcategorynews)
    
        // if (!searchcategorynews) {
        //   return errormessage(res, 401, `no data provided in params`);
        // }
        // const newss = await news.find();
        // const result = newss.filter((x) => {
        //   return x.category.categoryName
        //     .toUpperCase()
        //     .includes(searchcategorynews.toUpperCase());
        // });
    
        // if (result.length == 0) {
        //   return errormessage(res, 401, `no news found`);
        // }
        // return successmessage(
        //   res,
        //   200,
        //   `${result.length} news found ${searchcategorynews}`,
        //   result
        // );
      }
    }
export default newscontroller