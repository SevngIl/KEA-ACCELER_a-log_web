import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./Registerform.css";
import logo from "../../assets/logo/alog-logo.png";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [nickName, setNickName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (emailPattern.test(email)) {
      setIsEmailValid(true);
      setEmailMessage("올바른 이메일 형식이에요 : )");
    } else {
      setIsEmailValid(false);
      setEmailMessage("이메일 형식이 틀렸습니다. 다시 확인해주세요!");
    }
  }, [email]);

  useEffect(() => {
    if (password.length > 6) {
      setIsPasswordValid(true);
      setPasswordMessage("올바른 비밀번호 형식이에요 : )");
    } else {
      setIsPasswordValid(false);
      setPasswordMessage("비밀번호를 7글자 이상 설정해주세요!");
    }
  }, [password]);

  const handleRegister = () => {
    if (isEmailValid && isPasswordValid) {
      alert("회원가입에 성공하였습니다");
    } else if (!isEmailValid) {
      alert("이메일 형식을 확인하세요");
    } else if (!isPasswordValid) {
      alert("비밀번호 형식을 확인하세요");
    }
  };

  return (
    <div className="RegisterForm">
      <div className="center">
        <img className="logo-center" src={logo} alt="logo" />
        <h2 className="text-center">Create your A-Log Account</h2>
      </div>
      <div className="form-container">
        <div className="subform-container">
          <div>Email</div>
          <div className="email-container">
            <input type="text" placeholder="Enter your email address..." value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button variant="dark" className="check-button" disabled={!isEmailValid}>
              Check
            </Button>
          </div>
          <div className="email_status">{email.length > 0 && <span className={`message ${isEmailValid ? "success" : "error"}`}>{emailMessage}</span>}</div>
        </div>

        <div className="subform-container">
          <div>Check Number</div>
          <div className="checknum-container">
            <input type="text" placeholder="Enter your check number..." value={checkNumber} onChange={(e) => setCheckNumber(e.target.value)} />
            <Button variant="dark" className="check-button">
              Check
            </Button>
          </div>
        </div>

        <div className="subform-container">
          <div>Password</div>
          <input type="password" placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="password_status">
            {password.length > 0 && <span className={`message ${setIsPasswordValid ? "success" : "error"}`}>{passwordMessage}</span>}
          </div>
        </div>

        <div className="subform-container">
          <div>Nickname</div>
          <div className="nickname-container">
            <input type="text" placeholder="Enter your nickname..." value={nickName} onChange={(e) => setNickName(e.target.value)} />
            <Button variant="dark" className="check-button">
              Check
            </Button>
          </div>
        </div>

        <Button variant="dark" className="register-button" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
