import { FloatingWrapper } from "../../components/FloatingWrapper";
import "./Profile.css";
import ProfileImg from "../../assets/images/profile.png";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import React from "react";
import FadeIn from "../../animation/FadeIn";
import { UploadUserProfileImage, UpdateUserNN } from "../../service/user/users.service";

const Profile = () => {
  const { userData, userToken } = useContext(AuthenticationContext);
  console.log(userData);
  const [profileImage, setProfileImage] = useState(ProfileImg);
  const [nickname, setNickname] = useState(userData.userNN);

  const modifyLink = (url) => {
    // 슬래시 2개를 기준으로 뒷부분만 사용
    const urlObj = new URL(url);
    const path = urlObj.pathname.split("//")[1];
    // 앞부분에 https://alog.acceler.kr/를 붙이기
    const newUrl = "https://alog.acceler.kr/" + path;
    return newUrl;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // 미리보기와 Base64 형식의 문자열 가져오기
    const reader = new FileReader();
    reader.onloadend = async () => {
      setProfileImage(reader.result);
      // 이미지 업로드
      try {
        await UploadUserProfileImage(userData.userPk, file, userToken);
        alert("프로필 이미지가 저장되었습니다.");
      } catch (err) {
        alert("프로필 저장에 실패했습니다. 다시 시도해주세요.");
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(userData.userPk, file, userToken);
    console.log(userData);
  };

  const changeNickname = async () => {
    const newNickname = prompt("새 닉네임을 입력하세요:");

    if (newNickname) {
      console.log("userPk, nickname, userToken", userData.userPk, newNickname, userToken);

      // 닉네임 업데이트 로직에 따라서 서버에 변경 사항을 전송하고,
      // 정상적으로 변경되었다면 상태 업데이트
      try {
        await UpdateUserNN(userData.userPk, newNickname, userToken);
        setNickname(newNickname); // 상태 업데이트
        alert("닉네임이 변경되었습니다!");
      } catch (err) {
        alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("닉네임 변경이 취소되었습니다.");
    }
  };

  useEffect(() => {}, [userData.userNN]);

  return (
    <FadeIn>
      <div className="Profile">
        <FloatingWrapper>
          <div className="leftContainer">
            <div className="profile-header">
              <img className="profileImg" src={profileImage} />
              <label className="w-btn-outline w-btn-indigo-outline custom-file-upload">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                사진 선택
              </label>
            </div>
            <div className="profile-body">
              <div className="userEmail-container">
                <div className="userEmail-header">이메일</div>
                <div>{userData.userEmail}</div>
              </div>
              <div className="userNN-container">
                <div className="userNN-header">닉네임</div>
                <div>{nickname}</div>
              </div>
              <div className="profile-buttons">
                <button type="button" className="btn btn-outline-secondary" onClick={changeNickname}>
                  닉네임 변경
                </button>
              </div>
            </div>
          </div>
        </FloatingWrapper>
      </div>
    </FadeIn>
  );
};

export default Profile;
