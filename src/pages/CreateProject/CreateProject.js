import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./CreateProject.css";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [projectLeader, setProjectLeader] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProject = {
      name: projectName,
      key: projectKey,
      leader: projectLeader,
    };

    // 로컬 스토리지에서 프로젝트 가져오기
    const currentProjects = JSON.parse(localStorage.getItem("projects")) || [];

    // 새 프로젝트 추가하기
    currentProjects.push(newProject);

    // 업데이트된 프로젝트를 로컬스토리지에 저장
    localStorage.setItem("projects", JSON.stringify(currentProjects));

    // 입력칸 초기화
    setProjectName("");
    setProjectKey("");
    setProjectLeader("");

    alert("프로젝트가 추가되었습니다");
    navigate("/MyProjects");
  };

  return (
    <div className="CreateProject">
      <div className="Project-Detail">
        <h2>프로젝트 세부사항 추가</h2>
        <div className="Project-subdetail">프로젝트 설정에서 이러한 세부사항을 언제든지 수정할 수 있습니다.</div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="projectName" controlId="projectName">
          <Form.Label>이름</Form.Label>
          <Form.Control
            className="projectName_input"
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="projectKey" controlId="projectKey">
          <Form.Label>키</Form.Label>
          <Form.Control
            className="projectKey_input"
            type="text"
            placeholder="Enter project key"
            value={projectKey}
            onChange={(e) => setProjectKey(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="projectLeader" controlId="projectLeader">
          <Form.Label>Leader</Form.Label>
          <Form.Control
            className="projectLeader_input"
            type="text"
            placeholder="Enter project leader"
            value={projectLeader}
            onChange={(e) => setProjectLeader(e.target.value)}
          />
        </Form.Group>

        <div className="button-group">
          <Button variant="secondary" type="button">
            취소
          </Button>
          <Button variant="primary" type="submit">
            프로젝트 만들기
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateProject;
