import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./LeftTeamSection.css";
import { Button } from "react-bootstrap";
import CreateTeamModal from "../components/Modal/CreateTeamModal";
import FadeIn from "../animation/FadeIn";

const LeftTeamSection = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addTeam = (newTeam) => {
    setTeams([...teams, newTeam]);
  };

  useEffect(() => {
    // 로컬 스토리지에서 팀 정보 가져오기
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];

    // 가져온 팀 정보를 상태에 설정
    setTeams(storedTeams.map((team) => team.name));
  }, []);

  return (
    <div className="LeftTeamSection">
      <FadeIn className="container">
        <Button className="all-button" variant="outline-primary" onClick={() => navigate("/All")}>
          All
        </Button>
        <Button className="private-button" variant="outline-primary" onClick={() => navigate("/Private")}>
          Private
        </Button>
        <div className="teams">
          <h4 className="teams-title">Teams</h4>
          {teams.map((team, index) => (
            <Button variant="outline-success" key={index} onClick={() => navigate(`/${team}`)}>
              {team}
            </Button>
          ))}
          <Button variant="outline-success" onClick={() => setShowModal(true)}>
            +
          </Button>
          <CreateTeamModal addTeam={addTeam} show={showModal} handleClose={() => setShowModal(false)} />
        </div>
      </FadeIn>
      <Outlet />
    </div>
  );
};

export default LeftTeamSection;
