import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { app } from "../firebase";

function SignUpPage() {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const {userId, setUserId} = useContext(UserContext)
    const navigate = useNavigate()
    const auth = getAuth(app);

    function registerUser(event) {
        event.preventDefault()
        
        if(password !== confirmPassword){
            setError({message: "Passwords does not match!"})
            return
        }

        createUserWithEmailAndPassword(auth, mail, password)
            .then((userCredential) => {
                // Signed in 
                setUserId(userCredential.user.uid)
            })
            .then(() => navigate("/home"))
            .catch((error) => {
                setError(error)
                // ..
        });
    }

    //redirect to home after userId is set
    // eslint-disable-next-line
    useEffect(() => {
        if(userId)
            navigate("/home")
    },[userId])

    return(
        <div className="flex flex-col justify-center min-h-screen min-w-screen bg-gradient-to-br from-cyan-400 to-blue-700 text-white text-center">
            <h1 className="mb-4 text-4xl">Create an Account,</h1>
            <h2 className="mb-4 text-3xl">to get started now!</h2>
            {error && <p className="text-red-600">
                {
                error.code === "auth/invalid-email" ? "Invalid email" : 
                error.code === "auth/user-not-found" ? "User not found" : 
                error.code === "auth/wrong-password" ? "Wrong Password" : error.message
                }
            </p>}
            <form className="flex flex-col items-center gap-4 mt-4" onSubmit={registerUser}>
                <input
                    className="w-[70%] max-w-sm py-2 px-6 rounded text-gray-600"
                    type="text"
                    name="mail"
                    value={mail}
                    onChange={(event) => setMail(event.target.value)}
                    autoComplete="username"
                    placeholder="Email Address"
                    required
                />
                <input 
                    className="w-[70%] max-w-sm py-2 px-6 rounded text-gray-600"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="new-password"
                    placeholder="Password"
                    required
                />
                <input 
                    className="w-[70%] max-w-sm py-2 px-6 rounded text-gray-600"
                    type="password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    required
                />
                <p className="text-sm mb-8">Already have an account? <Link className="font-semibold" to="/">Login now.</Link></p>
                <button className="px-4 py-2 mb-4 bg-transparent rounded-xl text-lg font-bold text-gray-100 border-gray-100 border-4 drop-shadow-lg">Sign Up</button>
            </form>
        </ div>
    )
}

export default SignUpPage