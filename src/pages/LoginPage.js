import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";


function LoginPage() {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const {userId} = useContext(UserContext)
    const {login} = useFirebase()
    const navigate = useNavigate()

    useEffect(() => {
        if(userId)
            navigate("/home")
    }, [userId])

    function handleSubmit(event) {
        event.preventDefault()
        login(mail, password)
            .catch(err => setError(err))
    }

    return(
        <div className="flex flex-col justify-center min-h-screen min-w-screen bg-gradient-to-br from-cyan-400 to-blue-700 text-white text-center">
            <h1 className="mb-4 text-4xl">Welcome,</h1>
            <h2 className="mb-10 text-3xl">Glad to see you!</h2>
            {error && <p className="text-red-600">
                {
                error.code === "auth/invalid-email" ? "Invalid email" : 
                error.code === "auth/user-not-found" ? "User not found" : 
                error.code === "auth/wrong-password" ? "Wrong Password" : error.message
                }
                </p>}
            <form className="flex flex-col items-center gap-4 mt-4" onSubmit={handleSubmit}>
                <input
                    className="w-[70%] max-w-sm py-2 px-6 rounded text-gray-600"
                    type="text"
                    autoComplete="username"
                    placeholder="Email Address"
                    value={mail}
                    onChange={(event)=> setMail(event.target.value)}
                    required
                />
                <input 
                    className="w-[70%] max-w-sm py-2 px-6 rounded text-gray-600"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                    required
                />
                <p className="text-sm mb-8">Don't have an account yet? <Link className="font-semibold" to="/signup">Sign up now.</Link></p>
                <button className="px-4 py-2 mb-4 bg-transparent rounded-xl text-lg font-bold text-gray-100 border-gray-100 border-4 drop-shadow-lg">Login</button>
            </form>
        </ div>
    )
}

export default LoginPage