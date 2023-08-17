import React, { useState, useEffect, useContext } from "react";
import "./MyProjects.css";
import { Link, useNavigate } from "react-router-dom";
import plusImage from "../../assets/images/plus1.png";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import FadeIn from "../../animation/FadeIn";
import projectImg from "../../assets/images/project.png";
import { CiSettings } from "react-icons/ci";
import { ProjectsContext } from "../../service/projects/projects.context";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { TeamsContext } from "../../service/teams/teams.context";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const { GetMyTeamProjects, GetMyAllProjects } = useContext(ProjectsContext);

  const { userToken } = useContext(AuthenticationContext);
  console.log(userToken);
  const navigate = useNavigate();

  const { selectedTeamPk } = useContext(TeamsContext);

  const addProject = () => {
    navigate("/CreateProject");
  };

  useEffect(() => {
    const fetchProjects =
      !selectedTeamPk || selectedTeamPk === 9999
        ? () => GetMyAllProjects("", "DESC", 0, 100, userToken)
        : () => GetMyTeamProjects("", "DESC", 0, 100, selectedTeamPk, userToken);

    fetchProjects()
      .then((res) => {
        if (res.status === 200) {
          setProjects(res.data.data.content);
          console.log("my projects:", res);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("프로젝트 목록을 제대로 불러오지 못했습니다");
      });
  }, [selectedTeamPk]);

  useEffect(() => {
    console.log("Projects before fetching:", projects);
  }, [selectedTeamPk]);

  return (
    <FadeIn className="MyProjects">
      <div className="top-buttons">
        <Link to="/myProjects" className="top-button-link1">
          My Projects
        </Link>
        <Link to="/myIssues" className="top-button-link2">
          Assigned to me
        </Link>
      </div>
      <div className="Projects">
        <h2>Projects</h2>
        <div className="projects-container">
          {projects &&
            projects.map((project, index) => {
              // 이미지 인덱스 계산 (1부터 7까지 순환)
              const imageIndex = (index % 7) + 1;
              // 해당 이미지의 경로 생성
              const projectImg = require(`../../../src/assets/projectImages/ProjectImg${imageIndex}.png`); // 확장자는 실제 파일 확장자로 변경

              return (
                <FloatingWrapper className="project-card" key={index}>
                  <div
                    className="projectSettingBtn"
                    onClick={() => navigate(`/${project.team.teamPk}/${project.pk}/projectSetting`, { state: { pk: project.pk, name: project.name } })}
                  >
                    <CiSettings size={"24px"} />
                  </div>

                  <img
                    src={projectImg}
                    className="projectImg"
                    style={{ width: "150px", height: "150px", margin: "10px", cursor: "pointer" }}
                    onClick={() => navigate(`/${project.team.teamPk}/${project.pk}/Board`, { state: { pk: project.pk, name: project.name } })}
                  />
                  <div
                    className="projectDescription"
                    onClick={() => navigate(`/${project.team.teamPk}/${project.pk}/Board`, { state: { pk: project.pk, name: project.name } })}
                  >
                    <div className="project-title">{project.name}</div>
                    <div>
                      <div className="project-info">TEAM PK: {project.team.teamPk}</div>
                      <div className="project-info">DESCRIPTION: {project.description}</div>
                    </div>
                  </div>
                </FloatingWrapper>
              );
            })}

          <FloatingWrapper className="project-add">
            <button onClick={addProject}>
              <img src={plusImage} alt="add project" className="add-btn" />
            </button>
          </FloatingWrapper>
        </div>
      </div>
    </FadeIn>
  );
};

export default MyProjects;
