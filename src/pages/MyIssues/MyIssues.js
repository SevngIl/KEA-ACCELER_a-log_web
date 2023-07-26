import React, { useState, useEffect } from "react";
import "./MyIssues.css";
import { Link, useNavigate } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";

const MyIssues = () => {
  const navigate = useNavigate();

  return (
    <div className="MyIssues">
      <div className="top-buttons">
        <Link to="/myProjects" className="top-button-link1">
          My Projects
        </Link>
        <Link to="/myIssues" className="top-button-link2">
          Assigned to me
        </Link>
      </div>

      <FloatingWrapper className="Issue-container">
        <div className="TODO">
          <div className="TODO-head">TODO</div>
          <div className="TODO-body">[ACCELER] ACC03 A-Log 로그인 기능 구현</div>
        </div>
        <div className="INPROGRESS">
          <div className="INPROGRESS-head">IN PROGRESS</div>
          <div className="INPROGRESS-body">[ACCELER] ACC02 A-Log 회원가입 기능 구현</div>
        </div>
        <div className="DONE">
          <div className="DONE-head">DONE</div>
          <div className="DONE-body">[ACCELER] ACC01 A-Log 랜딩페이지 디자인</div>
        </div>
      </FloatingWrapper>
    </div>
  );
};

export default MyIssues;
