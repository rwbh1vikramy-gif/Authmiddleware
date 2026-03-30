import { Route, Routes } from "react-router-dom"
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import { Forget_passwsord } from "./components/forget_password"
import { Reset_password } from "./components/Reset_password"





function App() {
  

  return (
    <>
     <Routes>
<Route path="/" element={<Login/>} />
<Route path="/home" element={<Home/>}/>
<Route  path="/forget_password" element={<Forget_passwsord/>}/>
<Route  path="/reset_password" element={<Reset_password/>}/>


     </Routes>
    </>
  )
}

export default App
