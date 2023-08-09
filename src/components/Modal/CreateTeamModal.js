import React, { useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./CreateTeamModal.css";
import { TeamsContext } from "../../service/teams/teams.context";

const CreateTeamModal = ({ addTeam, show, handleClose }) => {
  const [teamName, setTeamName] = useState("");
  const [inviteUser, setInviteUser] = useState("");

  const { OnCreateTeam } = useContext(TeamsContext);

  const handleCreateTeam = async (event) => {
    event.preventDefault();

    const newTeam = {
      name: teamName,
      user: inviteUser,
    };
    // 로컬 스토리지에서 팀 정보 가져오기
    const currentTeams = JSON.parse(localStorage.getItem("teams")) || [];

    // 새 팀 추가하기
    currentTeams.push(newTeam);

    // 업데이트된 팀 정보를 로컬 스토리지에 저장
    localStorage.setItem("teams", JSON.stringify(currentTeams));

    addTeam(teamName);
    setTeamName("");
    // await OnCreateTeam(teamName, userNNList, userPk);
    await OnCreateTeam(teamName, ["string"], 1);
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} className="CreateTeamModal">
        <Modal.Header closeButton>
          <Modal.Title>새 팀 만들기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            팀에 추가하여 모든 인원을 한 곳에서 작업하도록 하세요.
            <br />
            @멘션하여 서로 연결하고 공동작업에서 협력하고 팀 프로필 페이지에서
            <br />
            모든 것을 효율적으로 관리합니다.
          </p>
          <Form>
            <Form.Group className="teamName-container">
              <Form.Label className="teamName">팀 이름</Form.Label>
              <Form.Control type="text" placeholder="팀 이름" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
            </Form.Group>
            <Form.Group className="teamMember-container">
              <Form.Label className="teamMember">팀에 사용자 초대</Form.Label>
              <Form.Control type="text" placeholder="사용자 이름" value={inviteUser} onChange={(e) => setInviteUser(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleCreateTeam}>
            팀 만들기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTeamModal;
