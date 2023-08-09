import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./Login.css";
import logo from "../../assets/logo/alog-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import FadeIn from "../../animation/FadeIn";
import { TextButton } from "../../components/Buttons";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { GitHubLoginRequestHandler, GithubAuth } from "../../service/authentication/github.service";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLogin, OnLogin } = useContext(AuthenticationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = () => {
    OnLogin(email, password);
  };

  useEffect(() => {
    if (isLogin === true) {
      navigate("/");
    }
  }, [isLogin]);
  useEffect(() => {
    if (isLogin === true) {
      navigate("/");
    }
  }, []);

  const OnGithubLogin = () => {
    GitHubLoginRequestHandler();
  };

  return (
    <FadeIn className="Login" childClassName="childClassName">
      <FloatingWrapper>
        <FadeIn childClassName="childClassName">
          <div className="center">
            <img className="logo-center" src={logo} alt="logo" />
            <h2 className="text-center">Log in to A-Log</h2>
          </div>

          <div className="input-container">
            <input type="text" className="email" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="password " placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="button-container">
            <Button variant="dark" className="login-button" onClick={() => LoginHandler()}>
              Login
            </Button>
            <hr />
            <Button
              className="github-button"
              onClick={() => {
                OnGithubLogin();
              }}
            >
              Continue with Github
            </Button>
          </div>
        </FadeIn>
      </FloatingWrapper>
      <div className="joinNowSection">
        New to A-Log?{" "}
        <TextButton
          className="joinNowBtn"
          onClick={() => {
            navigate("/registerform");
          }}
        >
          Join Now
        </TextButton>
      </div>
    </FadeIn>
  );
};

export default Login;
