import React, { useState } from "react";
import { useRouter } from 'next/router'
import AuthService from "../service/auth.service";
import Link from 'next/link';


const SignUp = () =>{
    const router = useRouter();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    let handleChangeEmail = (e) => {
        setName(e.target.value);       
      };
      let handleChangePassword = (e) => {
        setPassword(e.target.value);
      };

      let redirectToLogin = (e) => {
        e.preventDefault();
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if ((name === '' || regex.test(name) === false) || password === '') {
          setError(true);
        } else {
          setError(false);
          AuthService.register(name,password)
          .then(response =>{
            console.log(response)
           router.push('/signin');
          },error => {
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setErrorMsg(resMessage)
            console.log(error)
          })
        }
    }

    // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

    return (
        <>
        <div className="messages">
        {errorMessage()}
      </div>
        <form>
        <input placeholder="Enter email" onChange={handleChangeEmail}  className="input"
          value={name} type="email" />
 
        <input placeholder="Enter Password" onChange={handleChangePassword} className="input"
          value={password} type="password" />
 
        <button onClick={redirectToLogin} className="btn" type="submit">
          Register
        </button>
      </form>
      {errorMsg && <div>{errorMsg}</div>}
      <h3 className="title">
      Already a user? <Link href="/signin"> click to signin</Link>
</h3>
        </>
    );
}
    
export default SignUp