import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useProfile} from "../../context/profile-context";

const Signin = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const {signin} = useProfile()
    const handleSignin = async () => {
        try {
            await signin(
                emailRef.current.value,
                passwordRef.current.value
            )
            navigate("/profile")
        } catch (e) {
            alert('oops')
        }
    }
    return (
        <div>
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder="email" className="wd-input-field form-control" type="email"/>
            <input ref={passwordRef} placeholder="password" className="wd-input-field form-control" type="password"/>
            <hr/>
            <button onClick={handleSignin} className="btn btn-primary">
                Sign in
            </button>
        </div>
    );
};

export default Signin;