import { useState } from "react"
import "../App.css"
import axios from "axios"
import { useNavigate, useNavigation } from "react-router-dom"


export function Login(){
let [data,setdata]=useState({email:"", password:""})
let navigate=useNavigate()

async function handlesubmit(e){
    e.preventDefault()
let ds= await axios.post("http://localhost:5000/user/login", data)
let ans= await ds.data
console.log(ans)
localStorage.setItem("accessToken", ans.accessToken)
localStorage.setItem("refreshToken", ans.refreshToken)

}

function handlechange(e){
    let {value,name}=e.target
    setdata({...data, [name]:value})
}


    return (
<>
<div className="login_container">

<form onSubmit={handlesubmit} >
<input type="text" name="email" id="email" placeholder="enter email"  onChange={handlechange}/>
<input type="text" name="password" id="password" placeholder="enter password" onChange={handlechange}/>
<input type="submit" value="login" />



</form>

<button onClick={()=>navigate("/forget_password")}>forget_password</button>

</div>



</>
    )
}