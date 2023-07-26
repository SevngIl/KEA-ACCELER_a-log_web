import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./Login.css";
import logo from "../../assets/logo/alog-logo.png";
import { LoginRequestHandler } from "../../authentication/authentication.service";
import { useLocation, useNavigate } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import FadeIn from "../../animation/FadeIn";
import { TextButton } from "../../components/Buttons";
import { AuthenticationContext } from "../../authentication/authentication.context";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { isLogin, OnLogin } = useContext(AuthenticationContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LoginHandler = (email, password) => {
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
    // 깃허브로 로그인후 동작하는 코드.
    useEffect(() => {
        if (location.search) {
            function urlArgs() {
                var args = {};
                var query = location.search.substring(1);
                var pairs = query.split("&");
                for (var i = 0; i < pairs.length; i++) {
                    // '이름=값' 패턴을 찾는다.
                    var pos = pairs[i].indexOf("=");
                    // 찾을 수 없다면 스킵한다.
                    if (pos === -1) {
                        continue;
                    }
                    // 이름을 추출한다.
                    var name = pairs[i].substring(0, pos);
                    // 값을 추출한다.
                    var value = pairs[i].substring(pos + 1);
                    // 값을 해석한다.
                    value = decodeURIComponent(value);
                    // 프로퍼티로 저장한다.
                    args[name] = value;
                }
                // 추출된 전달인자들을 반환한다.
                return args;
            }
            // navigate(`/post/${props.id}`, { state: { id: props.id } });
        }
    }, []);

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
                                LoginRequestHandler();
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
