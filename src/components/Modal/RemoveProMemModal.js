import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { RemoveProjectMembers } from "../../service/projects/projects.service";

const RemoveProMemModal = ({ show, onHide, projectPk, projectName, onMemberRemoved, userToken }) => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleRemoveMember = async () => {
    // 함수 이름 변경
    try {
      const userPks = userInput.split(",").map((value) => parseInt(value.trim()));
      console.log(userPks);
      await RemoveProjectMembers(projectPk, userPks);
      alert("멤버가 성공적으로 삭제되었습니다.");
      onHide();
      if (onMemberRemoved) onMemberRemoved();
    } catch (error) {
      alert("멤버 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{`${projectName}에서 사용자 삭제`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>유저 pk 입력</Form.Label>
          <Form.Control type="text" placeholder="예: 1, 2, 3" value={userInput} onChange={handleInputChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="danger" onClick={handleRemoveMember}>
          팀원 삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveProMemModal;
