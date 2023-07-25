import React, { useState } from "react";
import "./MyProjects.css";
import { Link, useNavigate } from "react-router-dom";

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

  return (
    <div className="MyProjects">
      <div className="top-buttons">
        <Link to="/my-projects" className="top-button-link1">
          My Projects
        </Link>
        <Link to="/assigned-to-me" className="top-button-link2">
          Assigned to me
        </Link>
      </div>
      <div className="Projects">
        <h2>Projects</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.name}</h3>
              <p>{project.key}</p>
              <p>{project.leader}</p>
            </div>
          ))}
          <div className="project-add">
            <button onClick={addProject}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
