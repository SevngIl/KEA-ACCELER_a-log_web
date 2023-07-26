import React, { useState, createContext, useEffect } from "react";
import { loginHandler } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(JSON.parse(sessionStorage.getItem("userToken")));
    const [isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem("isLogin")));
    const [userData, setUserData] = useState(null);

    const OnLogin = async (userId, userPassword) => {
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

    const OnRegister = async (registerData) => {};

    return (
        <AuthenticationContext.Provider
            value={{
                isLogin, // 로그인 되었다고 알려주는 변수
                OnLogin, // 로그인 처리를 담당하는 함수
                OnLogout, // 로그아웃 처리를 담당하는 함수
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
