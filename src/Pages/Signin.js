import { BottomWarning } from "../Component/BottomWarning"
import { Button } from "../Component/Button"
import { Heading } from "../Component/Heading"
import { InputBox } from "../Component/InputBox"
import { SubHeading } from "../Component/SubHeading"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"


export const Signin = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onClick = async ()=>{
 const response = await axios.post("http://localhost:3002/api/v1/user/signin",{
  username: username,
  password: password
 })
if(response.data.token){
 console.log(response.data);

localStorage.setItem("token", response.data.token);
 navigate("/")
}else{
  console.log(response.data.message);
  navigate("/Signin")
}
    
  }


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={(e)=>{setUsername(e.target.value)}} />
        <InputBox placeholder="123456" label={"Password"} onChange={(e)=>{setPassword(e.target.value)}}/>
        <div className="pt-4">
          <Button label={"Sign in"} onClick={onClick} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}