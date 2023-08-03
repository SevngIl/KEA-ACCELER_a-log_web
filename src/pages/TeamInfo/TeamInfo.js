import React, { useState, useEffect } from "react";
import "./TeamInfo.css";
import { Link, useNavigate } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import FadeIn from "../../animation/FadeIn";
import plusImage from "../../assets/images/plus1.png";

const TeamInfo = () => {
  const [teams, setTeams] = useState([
    { name: "Team1", key: "key1", leader: "Leader1" },
    { name: "Team2", key: "key2", leader: "Leader2" },
    { name: "Team3", key: "key3", leader: "Leader3" },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(storedTeams);
  }, []);

  return (
    <FadeIn className="TeamInfo">
      <div className="Teams">
        <h2 className="myTeam">My Teams</h2>
        <div className="teams-container">
          {teams.map((team, index) => (
            <FloatingWrapper className="team-card" key={index}>
              <Link to={`/teamSetting`} key={index} className="team-setting">
                <h4 className="team-info">{team.name}</h4>
                <p className="team-info">{team.key}</p>
                <p className="team-info">{team.leader}</p>
              </Link>
            </FloatingWrapper>
          ))}
          <FloatingWrapper className="team-add">
            <button>
              <img src={plusImage} alt="add team" className="add-btn" />
            </button>
          </FloatingWrapper>
        </div>
      </div>
    </FadeIn>
  );
};

export default TeamInfo;
