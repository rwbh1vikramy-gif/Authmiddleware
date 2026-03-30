import { useState } from "react"
import "../App.css"
import axios from "axios"
export function Forget_passwsord(){
let [ds,setds]=useState("")
async function handlesubmit(e){
    e.preventDefault()
let ds1= await axios.post("http://localhost:5000/user/forget_password", {email:ds})
let ans= await ds1.data
if(ans.success){
    alert(ans.message)
}else{
    alert(ans.message)
}
}

return (
<>

<div className="forget_password">

<form onSubmit={handlesubmit}>

<input type="email" name="email" id="email"  onChange={(e)=>setds(e.target.value)} placeholder="enter email"/>
<input type="submit" value="send_email" />

</form>

</div>


</>


)


}