let dotenv= require("dotenv")
dotenv.config()
let express= require("express")
const ConnectDb = require("./config/mongo_config")
const Userrouter = require("./routes/User_routes")

let App= express()
App.use(express.json())
let PORT= process.env.PORT||5000

App.get("/test", (req,res)=>{
res.json({message:"test route successfully"})
})

App.use("/user",Userrouter )

App.listen(PORT, ()=>{
ConnectDb()
console.log("server is running at port 5000")
})


