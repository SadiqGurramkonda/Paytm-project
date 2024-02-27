import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export default function DashBoard(){
    const [amount,setAmount] = useState(0);
    console.log(localStorage.getItem("token"));
    useEffect(()=>{
        axios.get("//localhost:3000/api/v1/account/balance",{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")}
        }).then(response =>{
            setAmount(response.data.balance);
        })
    },[])


    return(
        <div>
            <AppBar></AppBar>
            <div className="m-8">
            <Balance value={amount}></Balance>
            <Users></Users>
            </div>
        </div>
    )
}