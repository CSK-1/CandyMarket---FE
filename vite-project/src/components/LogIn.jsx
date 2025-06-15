import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LogIn ({setToken}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();
        try{
            const response = await fetch(`https://localhost:3000/users/login`,
                {
                    method: "POST",
                    headers:{
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                            username: username, 
                            password: password
                        })
                }
            )
            const result = await response.json()
            setToken(result.token)
            navigate("/account")
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit} className="forms">
            <label>
                Username
                <input 
                name="username" 
                onChange={(event)=> setUsername(event.target.value)} 
                value={username} required/>
            </label>
            <label>
                Password
                <input 
                name="password" 
                onChange={(event)=> setPassword(event.target.value)} 
                value={password} minLength={6} required/>
            </label>
            <button>Log In</button>
        </form>
        </>
    )
}

export default LogIn