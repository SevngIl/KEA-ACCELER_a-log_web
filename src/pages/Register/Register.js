import React from "react";
import Button from "react-bootstrap/Button";
import "./Register.css";
import logo from "../../assets/logo/alog-logo.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registerform");
  };
  return (
    <div className="Register">
      <div className="center">
        <img className="logo-center" src={logo} alt="logo" />
        <h2 className="text-center">Create your A-Log Account</h2>
      </div>

      <div className="button-container">
        <Button variant="dark" className="github-button">
          Continue with Github
        </Button>
        <Button variant="dark" className="login-button" onClick={handleClick}>
          Continue with Email
        </Button>
      </div>
    </div>
  );
};

export default Register;
