import React from "react";
import Button from "react-bootstrap/Button";
import "./Register.css";
import logo from "../../assets/logo/alog-logo.png";
import { useNavigate } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import FadeIn from "../../animation/FadeIn";

const Register = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/registerform");
    };
    return (
        <FadeIn className="Register" childClassName="childClassName">
            <FloatingWrapper>
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
            </FloatingWrapper>
        </FadeIn>
    );
};

export default Register;
