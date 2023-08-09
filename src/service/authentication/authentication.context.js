import React, { useState, createContext, useEffect } from "react";
import {
  GetEmailWithGHToken,
  PermitAllEmailLogin,
  PostSendVerifyEmail,
  PostVerifyEmail,
  UsersCheckDuplicate,
  UsersLogin,
  UsersSignup,
  UsersVerifiedSignup,
  loginHandler,
  permitAllEmailLogin,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(JSON.parse(sessionStorage.getItem("userToken")));
  const [isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem("isLogin")));
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")));

  const OnLogin = async (userEmail, userPw) => {
    const res = await UsersLogin(userEmail, userPw);
    console.log(res);
    if (res.data === "login failed") {
      alert("이메일과 비밀번호를 다시 확인해주세요.");
    } else {
      setUserToken(res.data);
      setUserData(JSON.parse(atob(res.data.split(".")[1])));
      sessionStorage.setItem("userData", JSON.stringify(atob(res.data.split(".")[1])));
      sessionStorage.setItem("userToken", JSON.stringify(res.data));
      sessionStorage.setItem("isLogin", true);
      setIsLogin(true);
      alert("로그인 되었습니다!");
    }
  };

  const OnLogout = () => {
    setUserToken("");
    window.location.reload();
    setIsLogin(false);
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userToken");
    alert("로그아웃 되었습니다!");
  };

  const OnRegister = async (email, userPW, userNN) => {
    const res = await UsersSignup(email, userPW, userNN)
      .then((res) => {
        alert(`회원가입이 완료되었습니다`);
      })
      .catch((e) => alert(e));
    console.log(res);
  };
  const OnVerifiedRegister = async (email, userPW, userNN) => {
    const res = await UsersVerifiedSignup(email, userPW, userNN)
      .then((res) => {
        alert(`회원가입이 완료되었습니다`);
      })
      .catch((e) => alert(e));
    console.log(res);
  };

  const OnDupNNCheck = async (userNN) => {
    const res = await UsersCheckDuplicate(userNN)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((e) => alert(e));

    return res;
  };

  const OnEmailVerifySend = async (email) => {
    const res = await PostSendVerifyEmail(email)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        return res;
      })
      .catch((e) => alert(e));
    return res;
  };
  const OnEmailVerify = async (email, code) => {
    const res = await PostVerifyEmail(email, code)
      .then((res) => {
        console.log(res);
        alert(res.data);
        if (res.data == "Email is Verified Successfully") {
          return true;
        } else return false;
      })
      .catch((e) => alert(e));
    return res;
  };

  const OnGHLogin = async (accessToken) => {
    try {
      const ghEmail = await GetEmailWithGHToken(accessToken);
      console.log(ghEmail);
      if (ghEmail === null) {
        alert("이메일을 알 수 없는 깃허브 계정입니다");
      }
      const emailCheck = await PermitAllEmailLogin(ghEmail);
      console.log(emailCheck);
      const res = emailCheck.data.split(" ");
      if (res[0] === "email") {
        alert("회원가입창으로 이동합니다 닉네임을 설정해주세요!");
        console.log("email");
        return { type: "email", result: res[1] };
      } else {
        console.log("jwt : ", res[1]);
        setUserToken(res[1]);
        setUserData(JSON.parse(atob(res[1].split(".")[1])));
        sessionStorage.setItem("userData", JSON.stringify(atob(res[1].split(".")[1])));
        sessionStorage.setItem("userToken", JSON.stringify(res[1]));
        sessionStorage.setItem("isLogin", true);
        setIsLogin(true);
        alert("로그인 되었습니다!");
        return { type: "jwt", result: res[1] };
      }
    } catch {}
  };
  return (
    <AuthenticationContext.Provider
      value={{
        userData,
        userToken,
        isLogin, // 로그인 되었다고 알려주는 변수
        OnLogin, // 로그인 처리를 담당하는 함수
        OnLogout, // 로그아웃 처리를 담당하는 함수
        OnRegister, // 회원가입을 담당하는 함수
        OnVerifiedRegister, // 깃허브 로그인을 통한 회원가입을 하는 함수(이매일 인증 x)
        OnDupNNCheck, // 회원가입시 닉네임 중복체크 담당 함수
        OnEmailVerifySend, // 이메일 인증 번호를 보내는 함수
        OnEmailVerify, // 이메일 인증 결과 요청 함수
        OnGHLogin, // 엑세스 토큰으로 유저정보를 받아와 로그인 / 회원가입 처리를 해주는 함수
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
