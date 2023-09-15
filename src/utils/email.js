import nodemailer from "nodemailer"

const sendemail=async(alluserinfo,newsdata)=>{

    let transport=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD

    },
});
let mailoptions={
    from:process.env.EMAIL,
    to:alluserinfo.email,
    subject:`${alluserinfo.firstname} new post has been posted`,
    html:`<p>Dear, <b>${alluserinfo.firstname} ${alluserinfo.lastname}</b></p><br><br>  
    <p>news post <b>${newsdata.newsmaintitle}</b></p><br><br> 
    <p>click here<a href="http:akazuba.com">Akazuba</a></p>`
};
transport.sendMail(mailoptions,function(err,info){
    if(err){
        console.error(err);
    }
    else{
        console.log(info);
    }
});

}
export default sendemail