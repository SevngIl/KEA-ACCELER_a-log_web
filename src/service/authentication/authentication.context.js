import React, { useState, createContext, useEffect } from "react";
import { PostSendVerifyEmail, PostVerifyEmail, UsersCheckDuplicate, UsersLogin, UsersSignup, loginHandler } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(JSON.parse(sessionStorage.getItem("userToken")));
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState(null);

    const OnLogin = async (userEmail, userPw) => {
        const res = await UsersLogin(userEmail, userPw);
        console.log(res);
        sessionStorage.setItem("isLogin", true);
        setIsLogin(true);
        alert("로그인 되었습니다!");
    };

    const OnLogout = () => {
        setUserToken("");
        window.location.reload();
        setIsLogin(false);
        sessionStorage.removeItem("isLogin");
        alert("로그아웃 되었습니다!");
    };

    const OnRegister = async (email, userPW, userNN) => {
        const res = await UsersSignup(email, userPW, userNN)
            .then(alert(`회원가입이 완료되었습니다`))
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
    return (
        <AuthenticationContext.Provider
            value={{
                isLogin, // 로그인 되었다고 알려주는 변수
                OnLogin, // 로그인 처리를 담당하는 함수
                OnLogout, // 로그아웃 처리를 담당하는 함수
                OnRegister, // 회원가입을 담당하는 함수
                OnDupNNCheck, // 회원가입시 닉네임 중복체크 담당 함수
                OnEmailVerifySend, // 이메일 인증 번호를 보내는 함수
                OnEmailVerify, // 이메일 인증 결과 요청 함수
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
