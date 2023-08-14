import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./LeftNavSection.css";
import { Button } from "react-bootstrap";
import logo from "../assets/logo/alog-logo.png";
import { FloatingWrapper } from "../components/FloatingWrapper";
import React, { useState } from "react";
import { TeamsContext } from "../service/teams/teams.context";

export const LeftNavSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [teamPk, projectPk] = location.pathname.split("/").slice(1, 3);

  console.log(location);
  return (
    <div className="LeftNavSection">
      <FloatingWrapper width={"200px"} height={"500px"} className="container">
        <div className="head_container">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="project-name">{location.state.name}</div>
        </div>

        <div className="planning_container">
          <div className="planning">Planning</div>
          <div className="Timeline">
            <Button variant="outline-primary" onClick={() => navigate(`/${teamPk}/${projectPk}/Timeline`, { state: location.state })}>
              TimeLine
            </Button>
          </div>
          <div className="Board">
            <Button variant="outline-primary" onClick={() => navigate(`/${teamPk}/${projectPk}/Board`, { state: location.state })}>
              Board
            </Button>
          </div>
        </div>

        <div className="release_container">
          <div className="release">Release</div>
          <div className="Notes">
            <Button variant="outline-primary" onClick={() => navigate(`/${teamPk}/${projectPk}/ReleaseNote`, { state: location.state })}>
              Notes
            </Button>
          </div>
        </div>
      </FloatingWrapper>
      <Outlet />
    </div>
  );
};
