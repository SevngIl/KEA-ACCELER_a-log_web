import { useState, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import "./ProjectSetting.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GetProjectDetail, PatchUpdateProject, DeleteProject } from "../../service/projects/projects.service";

export const ProjectSetting = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teamPk, setTeamPk] = useState(0); // number로 변경
  const [pmPk, setPmPk] = useState(0); // number로 변경

  const navigate = useNavigate();
  const { projectPk, projectName } = useParams();

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await PatchUpdateProject(projectPk, name, description, teamPk, pmPk);
      alert("프로젝트 수정이 완료되었습니다.");
    } catch (err) {
      alert("프로젝트 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("이 프로젝트를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await DeleteProject(projectPk);
        alert("프로젝트 삭제가 완료되었습니다.");
        navigate("/myProjects"); // 삭제 후 리디렉션할 페이지
      } catch (err) {
        alert("프로젝트 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    if (projectPk !== null) {
      GetProjectDetail(projectPk)
        .then((res) => {
          setName(res.data.data.name);
          setDescription(res.data.data.description);
          setTeamPk(res.data.data.teamPk);
          setPmPk(res.data.data.pmPk);
        })
        .catch((err) => {
          console.error(err);
          alert("프로젝트 정보를 제대로 불러오지 못했습니다");
        });
    }
  }, [projectPk]);

  return (
    <div className="ProjectSetting">
      <FloatingWrapper width="250px" height="80vh" padding="2%">
        <div className="title">Project Setting</div>

        <div className="projectNameWrapper">
          <div className="icon"></div>
          <h2>A-Log</h2>
        </div>
        <div className="prevPageWrapper">
          <AiOutlineArrowLeft className="arrow" size={24} />
          <div>전체 프로젝트</div>
        </div>

        <h5 className="leftMenuItem" onClick={() => navigate(`/projectSetting/${projectPk}/${projectName}`)}>
          세부 사항
        </h5>
        <h5 className="leftMenuItem" onClick={() => navigate(`/projectAccess/${projectPk}/${projectName}`)}>
          액세스
        </h5>
      </FloatingWrapper>

      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FloatingWrapper style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "center" }} padding="6%">
          <div className="Project-Detail">
            <h2 className="Project-Detail-header">프로젝트 세부 사항</h2>

            <Form style={{ width: "100%" }} onSubmit={handleSave}>
              <Form.Group className="projectName" controlId="projectName">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  className="projectName_input"
                  type="text"
                  placeholder="Enter project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly
                  style={{ background: "#f3f3f3", borderColor: "#ccc" }}
                />
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
                <Form.Control
                  className="teamPk_input"
                  type="number"
                  placeholder="Enter team PK"
                  value={teamPk}
                  onChange={(e) => setTeamPk(Number(e.target.value))}
                  readOnly
                  style={{ background: "#f3f3f3", borderColor: "#ccc" }}
                />
              </Form.Group>

              <Form.Group className="pmPk" controlId="pmPk">
                <Form.Label>PM PK</Form.Label>
                <Form.Control
                  className="pmPk_input"
                  type="number"
                  placeholder="Enter PM PK"
                  value={pmPk}
                  onChange={(e) => setPmPk(Number(e.target.value))}
                  readOnly
                  style={{ background: "#f3f3f3", borderColor: "#ccc" }}
                />
              </Form.Group>

              <div className="button-group">
                <Button className="delete-button" variant="outline-danger" onClick={handleDelete}>
                  삭제
                </Button>
                <Button className="save-button" variant="outline-success" type="submit">
                  저장
                </Button>
              </div>
            </Form>
          </div>
        </FloatingWrapper>
      </div>
    </div>
  );
};
