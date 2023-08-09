import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./LeftNavSection.css";
import { Button } from "react-bootstrap";
import logo from "../assets/logo/alog-logo.png";
import { FloatingWrapper } from "../components/FloatingWrapper";
import React, { useState } from "react";

export const LeftNavSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectPk, setProjectPk] = useState(location.pathname.split("/")[2]);

  console.log(location);
  return (
    <div className="LeftNavSection">
      <FloatingWrapper width={"200px"} height={"500px"} className="container">
        <div className="head_container">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="A-Log">A-Log</div>
        </div>

        <div className="planning_container">
          <div className="planning">Planning</div>
          <div className="Timeline">
            <Button variant="outline-primary" onClick={() => navigate(`/Timeline/${projectPk}`)}>
              TimeLine
            </Button>
          </div>
          <div className="Board">
            <Button variant="outline-primary" onClick={() => navigate(`/Board/${projectPk}`)}>
              Board
            </Button>
          </div>
        </div>

        <div className="release_container">
          <div className="release">Release</div>
          <div className="Notes">
            <Button variant="outline-primary" onClick={() => navigate(`/ReleaseNote/${projectPk}`)}>
              Notes
            </Button>
          </div>
        </div>
      </FloatingWrapper>
      <Outlet />
    </div>
  );
};
