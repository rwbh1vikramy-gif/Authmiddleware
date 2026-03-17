 var jwt = require('jsonwebtoken');
 
 function Auth(role){

return (req,res,next)=>{

    // console.log(req.headers)

    let token= req.headers.accesstoken.split(" ")[1]
    var decoded = jwt.verify(token, 'shhhhh');
if(decoded.role==role){
    req.userId=decoded.UserId
    next()
}else{
    return res.json({success:false, message:"user not allowed for this route"})
}
return res.json({success:true, message:"header found"})

}




}

module.exports=Auth