import { useRef } from "react"
import "../App.css"
import {  useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"

export function Reset_password(){
let new_password= useRef()
let confirm_password= useRef()
    let [Searchparams]=useSearchParams()
let navigate=useNavigate()
let token = Searchparams.get("accessToken")

async function handlesubmit(e){
    e.preventDefault()
console.log(new_password.current.value)

if(new_password.current.value !== confirm_password.current.value){
return alert("please enter same  both password")
}

let res= await axios.post("http://localhost:5000/user/reset-password", {new_password:new_password.current.value, token})

let res1= await res.data 
if(res1.success){
    alert("password updated successfully")
navigate("/")
}else{
    alert(res1.message)
}

}



console.log(token)


    return (
<>
<h1>This is reset password</h1>

<form onSubmit={handlesubmit} className="change_password">

<input type="text" name="new_password" id=""  placeholder="new_password" ref={new_password}/>
<input type="text" name="confirm_password" id=""  placeholder="confirm_password" ref={confirm_password}/>
<input type="submit" value="change password" />



</form>



</>

    )
}