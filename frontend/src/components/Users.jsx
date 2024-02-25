import { Button } from "./Button"

export const Users = ()=>{
    const Users = [{firstname:"sdq",lastname:"sdq"}]
    return(<>
    <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search for users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {Users.map(user=><User user={user}></User>)}
        </div>
    </>
    )
}

function User({user}){

    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center text-xl">
                        {user.firstname[0]}
                        </div>
                        </div>
                        <div className="flex flex-col justify-center h-full">
                            <div>
                                {user.firstname} {user.lastname}
                            </div>
                        </div>
                    </div>
            <div className="flex flex-col justify-center h-full">
                <Button label={"Send money"}></Button>    
            </div>
        </div>
    )

}