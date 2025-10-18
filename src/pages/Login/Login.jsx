import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import {login, signup} from "../../firebase.js";

const Login = () => {

    const [signState, setSignState] = useState("Sign In");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const user_auth = async () => {
        if (signState === "Sign In") {
            await login(email, password);
        } else {
            await signup(name, email, password);
        }
    };

    return (
        <div className="login">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="login-form">
                <h1>{signState}</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (signState === "Sign Up") {
                        signup(name, email, password);
                    } else {
                        login(email, password);
                    }
                }}>
                    {signState === "Sign Up" ? <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" required /> : <></>}
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
                    <button type="submit" className="login-button">{signState}</button>
                    <div className="form-help">
                        <div className="remember">
                            <input type="checkbox" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <p>Need help?</p>
                    </div>
                </form>
                <div className="form-switch">
                    {signState === "Sign In" ?
                        <p>New to Netflix? <span onClick={() => { setSignState("Sign Up") }}>Sign Up Now</span></p>
                        : <p>Already have account? <span onClick={() => { setSignState("Sign In") }}>Sign In Now</span></p>}
                </div>
            </div>
        </div>
    );
};

export default Login;