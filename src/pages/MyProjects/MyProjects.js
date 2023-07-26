import React, { useState, useEffect } from "react";
import "./MyProjects.css";
import { Link, useNavigate } from "react-router-dom";
import plusImage from "../../assets/images/plus1.png";
import { FloatingWrapper } from "../../components/FloatingWrapper";

const MyProjects = () => {
  const [projects, setProjects] = useState([
    { name: "Project1", key: "key1", leader: "Leader1" },
    { name: "Project2", key: "key2", leader: "Leader2" },
    { name: "Project3", key: "key3", leader: "Leader3" },
  ]);

  const navigate = useNavigate();

  const addProject = () => {
    navigate("/CreateProject");
  };

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);
  return (
    <div className="MyProjects">
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
          {projects.map((project, index) => (
            <FloatingWrapper className="project-card" key={index}>
              <Link to={`/Board`} key={index} className="project-link">
                <h3 className="project-info">{project.name}</h3>
                <p className="project-info">{project.key}</p>
                <p className="project-info">{project.leader}</p>
              </Link>
            </FloatingWrapper>
          ))}
          <FloatingWrapper className="project-add">
            <button onClick={addProject}>
              <img src={plusImage} alt="add project" className="add-btn" />
            </button>
          </FloatingWrapper>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
