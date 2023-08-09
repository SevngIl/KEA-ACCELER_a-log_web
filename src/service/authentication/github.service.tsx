import React from "react";
import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID!;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET!;

const GITHUB_AUTH_CODE_SERVER = "/login/oauth/authorize";
const GITHUB_AUTH_TOKEN_SERVER = "/login/oauth/access_token";
const GITHUB_API_SERVER = "/user";

// 깃허브 로그인창으로 다이렉트 해주는 함수
export const GitHubLoginRequestHandler = () => {
    // TODO: GitHub로부터 사용자 인증을 위해 GitHub로 이동해야 합니다. 적절한 URL을 입력하세요.
    // OAuth 인증이 완료되면 authorization code와 함께 callback url로 리디렉션 합니다.
    return window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
    //로그인 요청을 보내면 github auth server에서 redirect 로 callback, 그리고 auth code를 전달
};

export const GithubAuth = async (code: string) => {
    console.log(code);
    const clientId = CLIENT_ID;
    const clientSecret = CLIENT_SECRET;

    const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
    });

    // 요청 헤더를 설정합니다.
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    // axios.post 메소드를 사용하여 요청을 보냅니다.
    const res = await axios
        .post(`${GITHUB_AUTH_TOKEN_SERVER}`, body, { headers: headers })
        .then((response) => {
            // 응답을 로그로 출력합니다.
            console.log("response : ", response.data);
            // 응답 데이터에서 access_token을 추출합니다.
            const accessToken = response.data.access_token;
            // 필요한 경우 추가 로직을 여기에 추가할 수 있습니다.

            return accessToken;
        })
        .catch((error) => {
            // 에러를 로그로 출력합니다.
            console.error("error : ", error.message);
        });
    return res;
};
