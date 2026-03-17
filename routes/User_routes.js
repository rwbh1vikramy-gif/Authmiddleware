let express= require("express")
let Userrouter= express.Router()
const bcrypt = require('bcrypt');
const { User } = require("../modals");
var jwt = require('jsonwebtoken');
const Auth = require("../middleware/Authmiddleware");

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
 
if(err){
res.json({success:false, message:err.message})
}else{

let  accessToken = jwt.sign({name:user.name, role:user.role, email:user.email, UserId:user._id}, 'shhhhh', { expiresIn: 60 * 60 });
let  refreshToken = jwt.sign({name:user.name, role:user.role, email:user.email,UserId:user._id}, 'shhhhh', { expiresIn:"7d"});




   res.json({success:true, message:"login successfully", accessToken, refreshToken})

}

});
}catch(e){
res.json({success:false, message:e.message})
}



})





Userrouter.post("/create-admin",Auth("manager"),  (req,res)=>{



})



module.exports=Userrouter