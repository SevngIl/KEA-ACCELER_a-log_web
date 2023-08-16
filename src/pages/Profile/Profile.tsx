import { FloatingWrapper } from "../../components/FloatingWrapper";
import "./Profile.css";
import ProfileImg from "../../assets/images/profile.png";
import { useContext } from "react";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import FadeIn from "../../animation/FadeIn";
export const Profile = () => {
  const { userData } = useContext(AuthenticationContext);
  console.log(userData);
  return (
    <FadeIn className="Profile" childClassName={"childClassName"}>
      <FloatingWrapper className="floatingWrapper">
        <div className="leftContainer">
          <img className="profileImg" src={ProfileImg} />
          <h5>이메일</h5>
          <p>{userData.userEmail}</p>
          <h5>닉네임</h5>
          <p>{userData.userNN}</p>
        </div>
        <div className="rightContainer"></div>
      </FloatingWrapper>
    </FadeIn>
  );
};
