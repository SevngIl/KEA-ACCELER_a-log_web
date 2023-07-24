import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Login.css";
import logo from "../../assets/logo/alog-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="Login">
      <div className="center">
        <img className="logo-center" src={logo} alt="logo" />
        <h2 className="text-center">Log in to A-Log</h2>
      </div>

      <div className="input-container">
        <input type="text" className="email" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="password " placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="button-container">
        <Button variant="dark" className="login-button">
          Login
        </Button>
        <hr />
        <Button className="github-button">Continue with Github</Button>
      </div>
    </div>
  );
};

export default Login;
