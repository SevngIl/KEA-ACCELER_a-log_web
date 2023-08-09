import { FloatingWrapper } from "../../components/FloatingWrapper";
import "./Profile.css";
import ProfileImg from "../../assets/images/profile.png";
import { useContext } from "react";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
export const Profile = () => {
    const { userData } = useContext(AuthenticationContext);
    console.log(userData);
    return (
        <div className="Profile">
            <FloatingWrapper>
                <div className="leftContainer">
                    <img className="profileImg" src={ProfileImg} />
                    <div>{userData.userEmail}</div>
                    <div>{userData.userNN}</div>
                </div>
                <div className="rightContainer">
                    <div>패스워드</div>
                    <div>회원 탈퇴</div>
                </div>
            </FloatingWrapper>
        </div>
    );
};
