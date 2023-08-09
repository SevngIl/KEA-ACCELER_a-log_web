import { useContext, useEffect } from "react";
import { GithubAuth } from "../../service/authentication/github.service";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { Spinner } from "react-bootstrap";
import GithubLogo from "../../assets/images/ghLogo.png";
import "./GithubLogin.css";
export const GithubLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { OnGHLogin, isLogin } = useContext(AuthenticationContext);

    useEffect(() => {
        if (isLogin === true) {
            navigate("/", { replace: true });
        }
    }, [isLogin]);

    useEffect(() => {
        if (location.search) {
            fetchGithubAuth();
        }
    }, []);

    const fetchGithubAuth = async () => {
        const code = urlArgs().code;
        const accessToken = await GithubAuth(code); // await를 사용
        const loginres = await OnGHLogin(accessToken);
        console.log(loginres);
        if (loginres.type === "email") {
            navigate("/registerform", { state: { email: loginres.result }, replace: true });
        } else {
        }
    };

    const urlArgs = () => {
        var args = {};
        var query = location.search.substring(1);
        var pairs = query.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf("=");
            if (pos === -1) {
                continue;
            }
            var name = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            value = decodeURIComponent(value);
            args[name] = value;
        }
        console.log(args);
        return args;
    };

    return (
        <div className="GithubLogin">
            <FloatingWrapper className="container">
                <img className="ghLogo" src={GithubLogo} />
                <div className="loadingWrapper">
                    <div>깃허브 로그인중...</div>
                    <Spinner />
                </div>
            </FloatingWrapper>
        </div>
    );
};
