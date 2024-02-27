import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = ()=>{
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("");

    //add debaouncing logic to limit get requests trigerring:

    function setRateLimit(fn,delay){

        let timerId;

        clearTimeout(timerId);

        timerId = setTimeout(() => {
            fn()
        },delay );
    }
     useEffect(()=>{

        axios.get("//localhost:3000/api/v1/user/bulk?filter=" + filter,{
            headers:{
                Authorization: "Bearer "+ localStorage.getItem("token")
            }
        }).then((response)=>{
            setUsers(response.data.users)
        })
     },[filter]);
    return(<>
    <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>setRateLimit(()=>{setFilter(e.target.value)},1000)} type="text" placeholder="Search for users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map((user)=><User key={user.username} user={user}></User>)}
        </div>
    </>
    )
}
function User({user}){

    const navigate = useNavigate();
    //console.log(user._id);

    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center text-xl">
                        {user.firstname[0].toUpperCase()}
                        </div>
                        </div>
                        <div className="flex flex-col justify-center h-full">
                            <div>
                                {user.firstname} {user.lastname}
                            </div>
                        </div>
                    </div>
            <div className="flex flex-col justify-center h-full">
                <div className="mt-2">
                    <Button onClick={() => {
                        navigate("/send?id=" + user.userId + "&name=" + user.firstname);
                    }} label={"Send money"}></Button>
                </div>
            </div>
        </div>
    )

}