import React, { useState, useEffect } from "react";
import "./MyProjects.css";
import { Link, useNavigate } from "react-router-dom";
import plusImage from "../../assets/images/plus1.png";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import FadeIn from "../../animation/FadeIn";
import projectImg from "../../assets/images/project.png";
import { CiSettings } from "react-icons/ci";
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
                    {projects.map((project, index) => (
                        <FloatingWrapper className="project-card" key={index}>
                            <div className="projectSettingBtn" onClick={() => navigate("/projectSetting")}>
                                <CiSettings size={"24px"} />
                            </div>

                            <img src={projectImg} className="projectImg" onClick={() => navigate("/Board")} />
                            <div className="projectDescription" onClick={() => navigate("/Board")}>
                                <div className="project-title">{project.name}</div>
                                <div>
                                    <div className="project-info">TEAM : ACCELER</div>
                                    <div className="project-info">KEY : {project.key}</div>
                                    <div className="project-info">LEAD : {project.leader}</div>
                                </div>
                            </div>
                        </FloatingWrapper>
                    ))}
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
