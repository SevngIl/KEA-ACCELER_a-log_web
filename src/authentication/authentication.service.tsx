const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const LoginRequestHandler = () => {
    // TODO: GitHub로부터 사용자 인증을 위해 GitHub로 이동해야 합니다. 적절한 URL을 입력하세요.
    // OAuth 인증이 완료되면 authorization code와 함께 callback url로 리디렉션 합니다.
    return window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
    //로그인 요청을 보내면 github auth server에서 redirect 로 callback, 그리고 auth code를 전달
};
