let express= require("express")
let Userrouter= express.Router()
const bcrypt = require('bcrypt');
const { User } = require("../modals");
var jwt = require('jsonwebtoken');
const {Auth,checkdata} = require("../middleware/Authmiddleware");

let nodemailer= require("nodemailer")


let  saltRounds=3

let role= ["manager", "admin", "user"]

Userrouter.post("/create-user", async (req,res)=>{
   try{
     let {password, email, name}= req.body
let myPlaintextPassword = password 

bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
    

if(err){
res.json({success:false, message:err.message})
}else{
let newUser =await new User({...req.body, password:hash})
await newUser.save()
res.json({message:"usercreated successfully", newUser})
}

})
   }catch(e){
res.json({success:false, message:e.message})
   }
    
})





Userrouter.post("/login", async (req,res)=>{
try{
   let {email, password}= req.body
let myPlaintextPassword=password
let user= await User.findOne({email:email})
if(!user) return res.json({success:false, message:"user not found with this email"})
let hash= user.password
console.log(user)

bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
 
if(result){
   let  accessToken =jwt.sign({name:user.name, role:user.role, email:user.email, UserId:user._id}, 'shhhhh', { expiresIn: 60*60 });
let  refreshToken = jwt.sign({name:user.name, role:user.role, email:user.email,UserId:user._id}, 'shhhhh', { expiresIn:"7d"});

 res.json({success:true, message:"login successfully", accessToken, refreshToken})
}else{
   return res.json({success:false, message:err})
}

});
}catch(e){
res.json({success:false, message:e.message})
}

})





Userrouter.post("/create_admin",Auth("manager"), checkdata, async (req,res)=>{

// res.json({success:true, message:"admin created successfully"})



try{
   let newadmin= new User({...req.body, role:"admin"})
await newadmin.save()
res.json({success:true, message:"admin created successfully"})
}catch(e){
res.json({success:false, message:e.message})
}
})


Userrouter.post("/create-students", Auth(...role.slice(0,2)),checkdata,async (req,res)=>{


try{
   let newuser= new User({...req.body})
await newuser.save()
res.json({success:false, message:"students created successfully", newuser})
}catch(e){
res.json({success:false, message:e.message})
}


})




let transported = nodemailer.createTransport({
service:"gmail",
auth:{
  user:process.env.USER,
  pass:process.env.PASSWORD
}
})


Userrouter.post("/send_email", async (req,res)=>{
let {email,name}=req.body

async function replytosender(){
   const info = await transported.sendMail({
      from: `Vikram Yadav <${process.env.USER}>`,
      to: email,
      subject: `Thank you for reaching out to Vikram Yadav`,
      html: `
      `,
    });
}



let info = await transported.sendMail({
  from: `"${name}"<${process.env.User}>`, 
  to: "imaaniperfumesweb@gmail.com",
  replyTo: email, 
  subject: "This testing for my self",
  html: `
    <h3 style="color:green; font-size:"20px">Connected Person Name: ${name}</h3>
    
  `,
});

await replytosender()

res.json({message:"email send successfully"})


})


Userrouter.post("/forget_password", async(req,res)=>{
try{
let {email}= req.body
let exituser= await User.find({email})

if(!exituser) return res.json({success:false, message:"email not found"})

   let  accessToken =jwt.sign({name:exituser.name, role:exituser.role, email:exituser.email, UserId:exituser._id}, 'shhhhh', { expiresIn: 60*15 });
let baseapi="http://localhost:5173/reset_password"

let finalApi= `${baseapi}?accessToken=${accessToken}`


   let info = await transported.sendMail({
  from: `"${exituser.name}"<${process.env.User}>`, 
  to: `${email}`,
  subject: "forget password",
  html: `
    <h3 style="color:green; font-size:"20px">this link will expire within 15 minutes</h3>
    <h3 style="color:green; font-size:"20px">reset-link:${finalApi}</h3>
  `,
});

res.json({success:true, message:"link send to your email for reset password"})


}catch(e){
res.json({success:false, message:e.message})
}
})

function generateOtp(){

let otp = Math.floor(1000 + Math.random() * 9000);
console.log(otp);
return otp

}


Userrouter.post("/generate_otp", async(req,res)=>{
try{
let {email}= req.body
let exituser= await User.find({email})

if(!exituser) return res.json({success:false, message:"email not found"})


let otp=generateOtp()



   let info = await transported.sendMail({
  from: `"${exituser.name}"<${process.env.User}>`, 
  to: `${email}`,
  subject: "forget password",
  html: `
    <h3 style="color:green; font-size:"20px">Your OTP is :</h3>
    <h3 style="color:green; font-size:"20px">OTp: ${otp}</h3>
  `,
});

res.json({success:true, message:"otp has been send to you email"})


}catch(e){
res.json({success:false, message:e.message})
}
})


Userrouter.post("/reset-password", (req,res)=>{

// verify token , if token is still alive then proceed it otherwise return without change password

try{
   res.json({success:true, message:"password changed successfully"})
}catch(e){
res.json({success:false, message:e.message})
}





})







module.exports=Userrouter