import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../auth";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const Login = () => {
    const [signState, setSignState] = useState("Sign In");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const user_auth = async (event) => {
        event.preventDefault();
        setLoading(true);
        let success = false;

        if (signState === "Sign In") {
            success = await login(email, password);
        } else {
            success = await signup(name, email, password);
        }

        setLoading(false);

        if (success) {
            navigate("/"); // 🔹 Redirection vers home après succès
        }
    };

    return loading ? (
        <div className="login-spinner">
            <img src={netflix_spinner} alt="Loading..." />
        </div>
    ) : (
        <div className="login">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="login-form">
                <h1>{signState}</h1>
                <form onSubmit={user_auth}>
                    {signState === "Sign Up" && (
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Your name"
                            required
                        />
                    )}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <button type="submit">{signState}</button>

                    <div className="form-help">
                        <div className="remember">
                            <input type="checkbox" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <p>Need help?</p>
                    </div>
                </form>

                <div className="form-switch">
                    {signState === "Sign In" ? (
                        <p>
                            New to Netflix?{" "}
                            <span onClick={() => setSignState("Sign Up")}>
                                Sign Up Now
                            </span>
                        </p>
                    ) : (
                        <p>
                            Already have account?{" "}
                            <span onClick={() => setSignState("Sign In")}>
                                Sign In Now
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
