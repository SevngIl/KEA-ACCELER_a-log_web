import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Logo from "../assets/logo/alog-logo.png";
import { useNavigate } from "react-router-dom";
import { TextButton } from "../components/Buttons";
import { AuthenticationContext } from "../service/authentication/authentication.context";
import Bell from "../assets/images/bell.png";
import Notification from "../components/Notification/Notification";
import MyWork from "../components/MyWork/MyWork";

interface LoggedInNavProps {
  onNotificationClick: () => void;
  onMyWorkClick: () => void;
}

const LoggedInNav = ({ onNotificationClick, onMyWorkClick }: LoggedInNavProps) => {
  const { OnLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <TextButton onClick={onMyWorkClick}>내 작업</TextButton>
          <TextButton title="프로젝트" onClick={() => navigate("/myProjects")}>
            프로젝트
          </TextButton>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <img
          src={Bell}
          className="moveCreateRN"
          alt="moveCreateRN"
          onClick={onNotificationClick}
          style={{ width: "20px", height: "20px", margin: "10px", cursor: "pointer" }}
        />

        <TextButton
          onClick={() => {
            navigate("/profile");
          }}
        >
          프로필
        </TextButton>
        <TextButton
          onClick={() => {
            OnLogout();
          }}
        >
          로그아웃
        </TextButton>
      </Navbar.Collapse>
    </>
  );
};

const LoggedOutNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto"></Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <TextButton onClick={() => navigate("/signin")}>Sign In</TextButton>
        <TextButton onClick={() => navigate("/registerform")}>Join</TextButton>
      </Navbar.Collapse>
    </>
  );
};

export const TopNavBar = () => {
  const { isLogin } = useContext(AuthenticationContext);
  const [showNotification, setShowNotification] = useState(false);
  const [showMyWork, setShowMyWork] = useState(false);
  const navigate = useNavigate();
  const handleNotificationClick = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleMyWorkClick = () => {
    setShowMyWork(true);
  };

  const handleCloseMywork = () => {
    setShowMyWork(false);
  };

  return (
    <div className="TopNavBar">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
            A-Log
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {isLogin === true ? <LoggedInNav onNotificationClick={handleNotificationClick} onMyWorkClick={handleMyWorkClick} /> : <LoggedOutNav />}
        </Container>
      </Navbar>
      <Notification show={showNotification} handleClose={handleCloseNotification} />
      <MyWork show={showMyWork} handleClose={handleCloseMywork} />
      <Outlet />
    </div>
  );
};
