import React, { useContext, useEffect, useState } from "react";
import "./TeamSetting.css";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { Button } from "react-bootstrap";
import check from "../../assets/images/check.png";
import { useLocation, useNavigate } from "react-router-dom";
import { TeamsContext } from "../../service/teams/teams.context";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

const TeamSetting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { OnGetTeamInfo, OnGetTeamMembers, OnAddTeamMembers, OnDeleteTeam, OnDeleteTeamMembers } = useContext(TeamsContext);
  const { userData, userToken } = useContext(AuthenticationContext);

  const [teamInfo, setTeamInfo] = useState("");
  const [teamPk, setTeamPk] = useState(location.pathname.split("/")[1]);
  const [members, setMembers] = useState({});

  const [headerImage, setHeaderImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const FetchTeamData = async () => {
    setTeamInfo(await OnGetTeamInfo(teamPk, userData.userPk, userToken));
    setMembers(await OnGetTeamMembers(teamPk, userData.userPk, userToken));
  };
  useEffect(() => {
    FetchTeamData();
  }, []);

  const handleAddUser = async () => {
    const newMember = prompt("새로운 사용자를 추가하세요");
    if (newMember) {
      await OnAddTeamMembers(teamPk, [newMember], userData.userPk, userToken);
      FetchTeamData();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setHeaderImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [deleteMember, setDeleteMember] = useState("");

  const handleDeleteMemberChange = (event) => {
    setDeleteMember(event.target.value);
  };

  const handleDelete = async () => {
    console.log(teamPk, [deleteMember], userData.userPk, userToken);
    await OnDeleteTeamMembers(teamPk, [deleteMember], userData.userPk, userToken);
    FetchTeamData();
    setDeleteMember(""); // 삭제할 멤버 상태 초기화
    setShowPopup(false);
  };

  const DeleteTeamHandler = async () => {
    console.log(teamPk, userData.userPk, userToken);
    const res = await OnDeleteTeam(teamPk, userData.userPk, userToken);
    if (res === true) {
      navigate(-1, { replace: true });
    }
  };

  return (
    <div className="TeamSetting">
      <h3 style={{ marginLeft: "10%" }}>{teamInfo.teamName}</h3>
      <div className="teamSetting-Header">
        <div className="header-image-container" style={{ backgroundImage: `url(${headerImage})` }}>
          {!headerImage && <span className="header-image-text">헤더 이미지</span>}
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} id="header-image-upload" style={{ display: "none" }} />
        <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
          <label htmlFor="header-image-upload" className="add-header-btn">
            헤더 이미지 추가
          </label>
          <Button style={{}} variant="outline-danger" onClick={() => DeleteTeamHandler()}>
            팀 삭제
          </Button>
        </div>
      </div>

      <div className="teamSetting-Body">
        <div className="teamMember">
          <FloatingWrapper className="teamMember-container">
            <div className="teamMember-head">구성원</div>
            <div className="teamMember-body">
              <div className="teamMember-button">
                <button type="button" className="btn btn-outline-secondary" onClick={handleAddUser} style={{ marginRight: "10px" }}>
                  사용자 추가
                </button>
                <button className="btn btn-outline-secondary" onClick={() => setShowPopup(true)}>
                  ...
                </button>
              </div>
              <div className="teamMembers-list">
                <h5>leader : {members && members.teamLeaderNN}</h5>
                {members.teamMemberNNs &&
                  members.teamMemberNNs.map((member, index) => (
                    <p key={index} className="teamMember-name">
                      {member}
                    </p>
                  ))}
              </div>
            </div>
          </FloatingWrapper>
          {showPopup && (
            <div className="delete-popup">
              <div className="delete-popup-content">
                <label>삭제할 구성원:</label>
                <input type="text" value={deleteMember} onChange={handleDeleteMemberChange} className="delete-input" />
                <div className="delete-popup-btn-group">
                  <Button className="delete-btn" onClick={handleDelete}>
                    삭제
                  </Button>
                  <Button className="delete-btn" onClick={() => setShowPopup(false)}>
                    취소
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="teamActivity">
          <FloatingWrapper className="teamActivity-container">
            <div className="teamActivity-head">팀 활동</div>
            <div className="teamActivity-body">
              <div className="teamActivity-issue-container">
                <div className="teamActivity-issue">
                  <img src={check} alt="check" className="check-icon" /> 활동 1
                </div>
                <div className="teamActivity-issue">
                  <img src={check} alt="check" className="check-icon" /> 활동 2
                </div>
                <div className="teamActivity-issue">
                  <img src={check} alt="check" className="check-icon" /> 활동 3
                </div>
              </div>
            </div>
          </FloatingWrapper>
        </div>
      </div>
    </div>
  );
};

export default TeamSetting;
