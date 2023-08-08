import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AddProjectMembers } from "../../service/projects/projects.service";

const InviteProMemModal = ({ show, onHide, projectPk, projectName }) => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInviteMember = async () => {
    try {
      const userPks = userInput.split(",").map((value) => parseInt(value.trim()));
      console.log(userPks);
      await AddProjectMembers(projectPk, userPks);
      alert("멤버가 성공적으로 추가되었습니다.");
      onHide(); // 모달을 닫습니다.
    } catch (error) {
      alert("멤버 추가에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{`${projectName}에 사용자 추가`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>이름 또는 이메일</Form.Label>
          <Form.Control type="text" placeholder="예: 1, 2, 3" value={userInput} onChange={handleInputChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="success" onClick={handleInviteMember}>
          팀원 추가
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviteProMemModal;
