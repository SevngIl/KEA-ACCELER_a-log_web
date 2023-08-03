import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import "./ProjectSetting.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
export const ProjectSetting = () => {
    const [projectName, setProjectName] = useState("");
    const [projectKey, setProjectKey] = useState("");
    const [projectLeader, setProjectLeader] = useState("");
    const navigate = useNavigate();

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

                <h5 className="leftMenuItem" onClick={() => navigate("/projectSetting")}>
                    세부 사항
                </h5>
                <h5 className="leftMenuItem" onClick={() => navigate("/projectAccess")}>
                    액세스
                </h5>
            </FloatingWrapper>
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FloatingWrapper style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "center" }} padding="6%">
                    <div className="Project-Detail">
                        <h2>프로젝트 세부 사항</h2>
                    </div>
                    <Form style={{ width: "100%" }}>
                        <Form.Group className="projectName" controlId="projectName">
                            <Form.Label>이름</Form.Label>
                            <Form.Control className="projectName_input" type="text" placeholder="Enter project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="projectKey" controlId="projectKey">
                            <Form.Label>키</Form.Label>
                            <Form.Control className="projectKey_input" type="text" placeholder="Enter project key" value={projectKey} onChange={(e) => setProjectKey(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="projectLeader" controlId="projectLeader">
                            <Form.Label>Leader</Form.Label>
                            <Form.Control className="projectLeader_input" type="text" placeholder="Enter project leader" value={projectLeader} onChange={(e) => setProjectLeader(e.target.value)} />
                        </Form.Group>

                        <div className="button-group">
                            <Button variant="outline-success" type="submit">
                                저장
                            </Button>
                        </div>
                    </Form>
                </FloatingWrapper>
            </div>
        </div>
    );
};
