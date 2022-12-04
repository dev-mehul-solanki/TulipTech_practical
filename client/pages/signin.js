import React, { useState } from "react";
import { useRouter } from 'next/router'
import AuthService from "../service/auth.service";
import Link from 'next/link';

const SignIn = () =>{
    const router = useRouter()
    const [inputName, setInputName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [error,setError] = useState('');

    let handleLoginEvent = (e) =>{
        e.preventDefault();
        AuthService.login(inputName,inputPassword)
        .then(response =>{
            router.push('/dashboard');
        },error =>{
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setError(resMessage)
        })
    }

    return (
        <>
        <h1>Enter your email and password</h1>
        <form>
            <input className="input" type="email" placeholder="Enter email" onChange={(e)=>setInputName(e.target.value)} required value={inputName} />
            <input className="input" type="password" placeholder="Enter Password" onChange={(e)=>setInputPassword(e.target.value)} required value={inputPassword}/>
            <button onClick={handleLoginEvent} className="btn" type="submit">Login</button>
        </form>
        {error && <div>{error}</div>}
        <h3 className="title">
      New user? <Link href="/"> click to signup</Link>
</h3>
        </>
    );
}
    
export default SignIn