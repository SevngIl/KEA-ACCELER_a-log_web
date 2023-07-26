import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import FadeIn from "../../animation/FadeIn";
import StartImg from "../../assets/images/start.png";

export default function Home() {
  const navigation = useNavigate();

  return (
    <div className="Home">
      <div className="page1">
        <FadeIn className="homeLeftWrapper" delay={100} transitionDuration={800}>
          <h1 className="catchphrase">
            A-Log is a better way
            <br /> to manage team and <br /> build products
          </h1>
          <div className="homeBtnWrapper">
            <Button className="GetStarted hvr-grow" onClick={() => navigation("/myProjects")}>
              Get Started
              <img src={StartImg} alt="start" style={{ marginLeft: "10px", height: "20px" }} />
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
