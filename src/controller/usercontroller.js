import  express  from "express";
import errormessage from "../utils/errormessage";
import User from "../model/user";
import successmessage from "../utils/successmessage";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

class usercontroller{
    static async createruser(req,res){
        const {firstname,lastname,email,password,role}=req.body
        try{
            if(req.body.password!==req.body.confirmpassword){
                return errormessage(res,401,`password and confirmpassword not match`)
            } 
            //hash password
            const hashpassword= bcrypt.hashSync(req.body.password,10)
            const user=await User.create({firstname,lastname,email,role,password:hashpassword})

            return successmessage(res,201,`user created`,user)
        }
        catch(error){
            return errormessage(res,500,`error ${error}`)
            
        }
        
        // catch(error){
        //     if(error.code==11000){
        //         return errormessage(res,201,`user already exist`)
        //     }
        // }
    }   
    // get all user
    static async getalluser(req,res){
        const user=await User.find();
        if(!user){
            return errormessage(res,201,`user not found`)
        }
        else{
            return successmessage(res,200,`all user ${user.length} found`,user)
        }
    }
    //get one user
    static async getOneUser(req,res){
        const id=req.params.id
        const user= await User.findById(id)
        if(!user){
          errormessage(res,401,`user with id ${id} not found`)
        }else{
          successmessage(res,200,`user successfuly retrieved`,user)
        }
      }
    //delete all users
    static async deletealluser(req,res){
        const user=await User.deleteMany();
        return errormessage(res,200,`user deleted`)
    }
    //delete one user
    static async deleteOneUser(req,res){
        const {id} = req.params
        const user =await User.deleteOne({_id:id});
        if(!user){
            return errormessage(res,400,`user not deleted`)
        }
        else{
            return successmessage(res,200,`user deleted`)
        }
    }
    //update user
    static async updateUser(req,res){
        const id=req.params.id
        const user=await User.findByIdAndUpdate(id,req.body,{new:true})
        if(!user){
          errormessage(res,401,`user with id ${id} not found`)
        }else{
          successmessage(res,200,`user successfuly updated`,user)
        }
      } 
    static async loginuser(req,res){
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return errormessage(res,401,`incorrect email `)
        }
        else{
            const comparePassword=bcrypt.compareSync(password,user.password)
            if(!comparePassword){
                return errormessage(res,401,`incorrect  password`)
            }
            else{
                const token=jwt.sign({user:user},process.env.SECRET_KEY,{expiresIn:"1d"})
                return res.status(200).json({
                    token:token,
                    data:{
                         user:user,
                    }
                })
            }
        }
    }   









    //   static async login(req,res){
    //     //take data from body
    //     const {email,password}=req.body
    //     //verify if email exist
    //     const user=await User.findOne({email})
    //     if(!user){
    //       return errorResponse(res,401,`Invalid email or password`)
    //     }else{
    //       //verify password
    //       const comparePassword=bcrypt.compareSync(password,user.password)
    //       if(!comparePassword){
    //         return errorResponse(res,401,`Invalid email or password`)
    //       }else{
    //         //generate a token
    //         const token=jwt.sign({role:user.role,email:user.email,firstName:user.firstName},process.env.SECRET_KEY,{expiresIn:"1d"})
    // return res.status(200).json({
    //   token:token,
    //   data:{
    //     email:user.email,
    //     firstName:user.firstName,
    //     role:user.role
    //   }
    // })
    //       }
    //     }
    //   }
}
export default usercontroller