import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "react-bootstrap/Button";
import "./Registerform.css";
import logo from "../../assets/logo/alog-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import FadeIn from "../../animation/FadeIn";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import Spinner from "react-bootstrap/Spinner";

const RegisterForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { OnDupNNCheck, OnRegister, OnEmailVerifySend, OnEmailVerify } = useContext(AuthenticationContext);

    const [email, setEmail] = useState();
    const [emailNumberChecked, setEmailNumberChecked] = useState(false);
    const [emailNumberSent, setEmailNumberSent] = useState(false);
    const [emailNumberSending, setEmailNumberSending] = useState(false);
    const [emailMessage, setEmailMessage] = useState("");
    const [checkNumber, setCheckNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [nickName, setNickName] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isNNValid, setIsNNValid] = useState(false);

    const emailRef = useRef();
    const [showEmailTip, setShowEmailTip] = useState(false);
    const passwordRef = useRef();
    const [showPasswordTip, setShowPasswordTip] = useState(false);

    const [isGitHubReg, setIsGitHubReg] = useState(false);
    useEffect(() => {
        if (location.state) {
            setEmail(location.state.email);
            setIsGitHubReg(true);
            setPassword("********");
            setCheckNumber("********");
        }
        console.log(location);
    }, []);

    useEffect(() => {
        const emailPattern = /^\S+@\S+\.\S+$/;
        if (email) {
            if (emailPattern.test(email)) {
                setIsEmailValid(true);
                setEmailMessage("올바른 이메일 형식이에요 : )");
                setTimeout(() => {
                    setShowEmailTip(false);
                }, 3500);
            } else {
                setTimeout(() => {
                    setShowEmailTip(true);
                }, 3000);
                setEmailMessage("이메일 형식이 틀렸습니다. 다시 확인해주세요!");
            }
        }
    }, [email]);

    useEffect(() => {
        if (password) {
            if (password.length > 6) {
                setIsPasswordValid(true);
                setTimeout(() => {
                    setShowPasswordTip(false);
                }, 3500);
                setPasswordMessage("올바른 비밀번호 형식이에요 : )");
            } else {
                setIsPasswordValid(false);
                setTimeout(() => {
                    setShowPasswordTip(true);
                }, 3000);
                setPasswordMessage("비밀번호를 7글자 이상 설정해주세요!");
            }
        } else {
            setShowPasswordTip(false);
        }
    }, [password]);

    const handleRegister = () => {
        if (setEmailNumberChecked && isPasswordValid && isNNValid) {
            OnRegister(email, password, nickName);
            navigate("/");
        } else if (!setEmailNumberChecked) {
            alert("이메일 인증을 해주세요.");
        } else if (!isNNValid) {
            alert("닉네임 중복체크를 해주세요");
        } else if (!isPasswordValid) {
            alert("비밀번호 형식을 확인하세요");
        }
    };

    const CheckEmailHandler = async () => {
        setEmailNumberSending(true);
        await OnEmailVerifySend(email).then((res) => {
            setEmailNumberSending(false);
            if (res.data == "You are already signed up") {
                return;
            }
            setEmailNumberSent(true);
        });
    };
    const CheckEmailMessageHandler = async () => {
        setEmailNumberChecked(await OnEmailVerify(email, checkNumber));
    };
    const CheckNNHandler = async () => {
        if ((await OnDupNNCheck(nickName)) == true) {
            alert("이미 사용중인 닉네임 입니다.");
            setIsNNValid(false);
        } else {
            alert("사용 가능한 닉네임 입니다");
            window.confirm("이 닉네임을 사용하시겠습니까?") && setIsNNValid(true);
        }
    };

    return (
        <FadeIn className="RegisterForm" childClassName="childClassName">
            <FloatingWrapper>
                <FadeIn childClassName="childClassName">
                    <div className="center">
                        <img className="logo-center" src={logo} alt="logo" />
                        <h2 className="text-center">Create your A-Log Account</h2>
                    </div>
                    <div className="form-container">
                        <div className="subform-container">
                            <div>Email</div>
                            <div className="email-container">
                                <input
                                    className={isGitHubReg || emailNumberChecked ? "isGitHubReg" : null}
                                    disabled={isGitHubReg || emailNumberChecked}
                                    ref={emailRef}
                                    type="text"
                                    placeholder="Enter your email address..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button
                                    variant="dark"
                                    className="check-button"
                                    disabled={!isEmailValid || emailNumberChecked || emailNumberSending}
                                    onClick={() => {
                                        CheckEmailHandler();
                                    }}
                                >
                                    {emailNumberSending ? <Spinner className="spinner" animation="border" /> : "Check"}
                                </Button>
                            </div>
                            <Overlay target={emailRef.current} show={showEmailTip} placement="left">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        <span className={`message ${isEmailValid ? "success" : "error"}`}>{emailMessage}</span>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </div>

                        <div className="subform-container">
                            <div>Check Number</div>
                            <div className="checknum-container">
                                <input
                                    className={isGitHubReg || !emailNumberSent || emailNumberChecked ? "isGitHubReg" : null}
                                    disabled={isGitHubReg || !emailNumberSent || emailNumberChecked}
                                    type="text"
                                    placeholder="Check Code"
                                    value={checkNumber}
                                    onChange={(e) => setCheckNumber(e.target.value)}
                                />
                                <Button
                                    disabled={!emailNumberSent || emailNumberChecked}
                                    variant="dark"
                                    className="check-button"
                                    onClick={() => {
                                        CheckEmailMessageHandler();
                                    }}
                                >
                                    Check
                                </Button>
                            </div>
                        </div>

                        <div className="subform-container">
                            <div>Password</div>
                            <input
                                className={isGitHubReg ? "isGitHubReg" : null}
                                disabled={isGitHubReg}
                                ref={passwordRef}
                                type="password"
                                placeholder="Enter your password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Overlay target={passwordRef.current} show={showPasswordTip} placement="left">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        <span className={`message ${isPasswordValid ? "success" : "error"}`}>{passwordMessage}</span>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </div>

                        <div className="subform-container">
                            <div>Nickname</div>
                            <div className="nickname-container">
                                <input
                                    className={isNNValid ? "isGitHubReg" : null}
                                    disabled={isNNValid}
                                    type="text"
                                    placeholder="Enter your nickname..."
                                    value={nickName}
                                    onChange={(e) => setNickName(e.target.value)}
                                />
                                <Button
                                    disabled={isNNValid}
                                    variant="dark"
                                    className="check-button"
                                    onClick={() => {
                                        CheckNNHandler();
                                    }}
                                >
                                    Check
                                </Button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
                <Button variant="dark" className="register-button" onClick={handleRegister}>
                    Register
                </Button>
            </FloatingWrapper>
        </FadeIn>
    );
};

export default RegisterForm;
