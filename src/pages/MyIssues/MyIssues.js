import React, { useState, useEffect, useContext } from "react";
import "./MyIssues.css";
import { Link, useNavigate } from "react-router-dom";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import FadeIn from "../../animation/FadeIn";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { GetMyIssues } from "../../service/issues/issues.service";

const MyIssues = () => {
  const navigate = useNavigate();
  const { userData, userToken } = useContext(AuthenticationContext);
  const issueAssigneePk = userData.userPk;

  const [issues, setIssues] = useState({
    TODO: [],
    INPROGRESS: [],
    DONE: [],
    EMERGENCY: [],
  });

  const page = 0;
  const size = 10;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분까지`;
  };

  useEffect(() => {
    GetMyIssues(issueAssigneePk, page, size, userToken)
      .then((res) => {
        const categorizedIssues = {
          TODO: [],
          INPROGRESS: [],
          DONE: [],
          EMERGENCY: [],
        };

        res.data.forEach((issue) => {
          const [year, month, day, hour, minute] = issue.endDate; // endDate 배열에서 값을 추출
          const endDateFormatted = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 까지`;
          categorizedIssues[issue.issueStatus].push({ description: issue.issueDescription, endDate: endDateFormatted });
        });

        setIssues(categorizedIssues);
      })
      .catch((err) => {
        // 오류 처리 로직
      });
  }, []);

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
      <FadeIn className="Issue-container" childClassName="childClassName">
        <FloatingWrapper width="80%" height="fit-content">
          {["TODO", "INPROGRESS", "DONE", "EMERGENCY"].map((status) => (
            <div key={status} className={status}>
              <div className={`${status}-head`}>{status}</div>
              {issues[status].map((issue, index) => (
                <div key={index} className={`${status}-body issue-detail`}>
                  <div>{issue.description}</div>
                  <div className="end-date">{issue.endDate}</div>
                </div>
              ))}
            </div>
          ))}
        </FloatingWrapper>
      </FadeIn>
    </div>
  );
};

export default MyIssues;
