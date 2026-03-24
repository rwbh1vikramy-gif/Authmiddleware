let mongoose= require("mongoose")



async function ConnectDb(){

try{
   await mongoose.connect(process.env.MONGO_URL)
    console.log("server connected to mongodb")
}catch(e){
console.log(e.message)
}


}




module.exports = ConnectDb