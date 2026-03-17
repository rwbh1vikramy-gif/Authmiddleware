let mongoose= require("mongoose")


let Userschema= new mongoose.Schema({
name:{type:String, required:true},
email:{type:String ,required:true},
password:{type:String, required:true},
role:{type:String, enum:["manager", "admin", "user"], default:"user"}
})


let Productschema= new mongoose.Schema({
Product_name:{type:String},
price:{type:Number},
rating:{rate:{type:Number}, rating:{type:Number}}
})

let User = mongoose.model("User", Userschema)
let Product = mongoose.model("Product", Productschema)





module.exports={User, Product}