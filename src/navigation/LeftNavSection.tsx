import { Outlet, useNavigate } from "react-router-dom";
import "./LeftNavSection.css";
import { Button } from "react-bootstrap";
import logo from "../assets/logo/alog-logo.png";

export const LeftNavSection = () => {
  const navigate = useNavigate();
  return (
    <div className="LeftNavSection">
      <div className="container">
        <div className="head_container">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="A-Log">A-Log</div>
        </div>

        <div className="planning_container">
          <div className="planning">Planning</div>
          <div className="Timeline">
            <Button onClick={() => navigate("/Timeline")}>TimeLine</Button>
          </div>
          <div className="Board">
            <Button onClick={() => navigate("/Board")}>Board</Button>
          </div>
        </div>

        <div className="release_container">
          <div className="release">Release</div>
          <div className="Notes">
            <Button onClick={() => navigate("/ReleaseNote")}>Notes</Button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
