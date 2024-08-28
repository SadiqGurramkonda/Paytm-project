import { useState } from 'react'
import { ButtomWarning } from '../components/BottomWarning'
import { Button } from '../components/Button'
import Heading from '../components/Heading'
import InputBox from '../components/InputBox'
import SubHeading from '../components/SubHeading'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup(){

    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const navigate  = useNavigate();


    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className='flex flex-col justify-center' >
                <div className='rounded-lg bg-white text-center p-2 h-max px-4 '>
                    <Heading label={"Sign up"}></Heading>
                    <SubHeading label={"Enter your information to create an account"}></SubHeading>
                    <InputBox onChange={e => {
                        setFirstname(e.target.value);
                    }} placeholder={"John"} label={"First Name"}></InputBox>
                    <InputBox onChange={e => {
                        setLastname(e.target.value)
                    }} placeholder={"Doe"} label={"Last Name"}></InputBox>
                    <InputBox onChange={e => {
                        setUsername(e.target.value)
                    }} placeholder={"sdq@gmail.com"} label={"Email"}></InputBox>
                    <InputBox onChange={e => {
                        setPassword(e.target.value)
                    }} placeholder={"123456"} label={"Password"}></InputBox>
                    <div className='pt-4'>
                        <Button onClick={async()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                username,
                                firstname,
                                lastname,
                                password
                            });
                            localStorage.setItem("token",response.data.token);
                            navigate("/dashboard");
                        }} label={"Sign up"}></Button>
                    </div>
                    <ButtomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></ButtomWarning>
                </div>
            </div>
        </div>
    )
}