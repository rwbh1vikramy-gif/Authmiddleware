 var jwt = require('jsonwebtoken');
const { User } = require('../modals');
 
 function Auth(...role){

return (req,res,next)=>{

    // console.log(req.headers)

try{
        let token= req.headers.accesstoken.split(" ")[1]
    var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded)

if(role.includes(decoded.role)){
    req.userId=decoded.UserId
    next()
}else{
    return res.json({success:false, message:"user not allowed for this route"})
}
// return res.json({success:true, message:"header found"})

}catch(e){
console.log(e.message)

if(e.message=="jwt expired"){
try{
        // console.log(req.headers.refreshtoken, "refresh token in cartcyh blobk")
      let token= req.headers.refreshtoken?.split(" ")[1]
      console.log(token, "token in catch block")
    var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded)
let new_access_token= jwt.sign({name:decoded.name, role:decoded.role, email:decoded.email,UserId:decoded.UserId}, 'shhhhh', { expiresIn: 20 });
console.log("data in refreshntken",new_access_token)
 req.userId=decoded.UserId
 res.setHeader("accesstoken", new_access_token);
// req.headers.accesstoken=new_access_token
next()
}catch(e){
return res.json({message:e.message, login:false, message2:"both token has expired"})
}
}else{
return res.json({message:e.message})
}
return res.json({message:e.message})
}

}

}




function checkdata(req,res,next){
let {password,email, name}=req.body
if(!password || !email || !name ) return res.json({message:"all field required", success:false})


let exituser= User.find({email:email})
if(exituser) return res.json({success:false, message:"user allready exit with this email"})


next()


}



module.exports={Auth, checkdata}