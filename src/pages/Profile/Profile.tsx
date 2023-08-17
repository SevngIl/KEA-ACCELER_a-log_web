import { FloatingWrapper } from "../../components/FloatingWrapper";
import "./Profile.css";
import ProfileImg from "../../assets/images/profile.png";
import { useContext } from "react";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import React from "react";

export const Profile = () => {
  const { userData } = useContext(AuthenticationContext);
  console.log(userData);
  return (
    <div className="Profile">
      <FloatingWrapper>
        <div className="leftContainer">
          <img className="profileImg" src={ProfileImg} />
          <div className="userEmail-container">
            <div className="userEmail-header">이메일</div>
            <div>{userData.userEmail}</div>
          </div>

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
