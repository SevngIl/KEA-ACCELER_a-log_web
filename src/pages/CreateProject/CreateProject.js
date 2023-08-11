import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./CreateProject.css";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { ProjectsContext } from "../../service/projects/projects.context";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teamPk, setTeamPk] = useState("");
  const [pmPk, setPmPk] = useState("");
  const navigate = useNavigate();
  const { PostCreateProjects } = useContext(ProjectsContext);

  const { userToken } = useContext(AuthenticationContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    PostCreateProjects(name, description, parseInt(teamPk), userToken)
      .then((res) => {
        if (res.data.code === 201 || 200) {
          alert("프로젝트가 추가되었습니다");
          navigate("/myProjects");
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(name, description, teamPk, pmPk);
      });

    setName("");
    setDescription("");
    setTeamPk("");
    // setPmPk("");
  };

  return (
    <div className="CreateProject">
      <FloatingWrapper className="CreateProject-container">
        <div className="Project-Detail">
          <h2>프로젝트 세부사항 추가</h2>
          <div className="Project-subdetail">프로젝트 설정에서 이러한 세부사항을 언제든지 수정할 수 있습니다.</div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="projectName" controlId="projectName">
            <Form.Label>이름</Form.Label>
            <Form.Control className="projectName_input" type="text" placeholder="Enter project name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="projectDesc" controlId="projectDesc">
            <Form.Label>설명</Form.Label>
            <Form.Control
              className="projectDesc_input"
              type="text"
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="teamPk" controlId="teamPk">
            <Form.Label>팀 PK</Form.Label>
            <Form.Control className="teamPk_input" type="number" placeholder="Enter team PK" value={teamPk} onChange={(e) => setTeamPk(e.target.value)} />
          </Form.Group>

          {/* <Form.Group className="pmPk" controlId="pmPk">
            <Form.Label>PM PK</Form.Label>
            <Form.Control className="pmPk_input" type="number" placeholder="Enter PM PK" value={pmPk} onChange={(e) => setPmPk(e.target.value)} />
          </Form.Group> */}

          <div className="button-group">
            <Button variant="secondary" type="button">
              취소
            </Button>
            <Button variant="primary" type="submit">
              프로젝트 만들기
            </Button>
          </div>
        </Form>
      </FloatingWrapper>
    </div>
  );
};

export default CreateProject;
