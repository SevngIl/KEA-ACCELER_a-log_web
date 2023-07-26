import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./LeftTeamSection.css";
import { Button } from "react-bootstrap";
import CreateTeamModal from "../components/Modal/CreateTeamModal";

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
      <div className="container">
        <Button className="all-button" onClick={() => navigate("/All")}>
          All
        </Button>
        <Button className="private-button" onClick={() => navigate("/Private")}>
          Private
        </Button>
        <div className="teams">
          <div className="teams-title">Teams</div>
          {teams.map((team, index) => (
            <Button key={index} onClick={() => navigate(`/${team}`)}>
              {team}
            </Button>
          ))}
          <Button variant="primary" onClick={() => setShowModal(true)}>
            +
          </Button>
          <CreateTeamModal addTeam={addTeam} show={showModal} handleClose={() => setShowModal(false)} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LeftTeamSection;
