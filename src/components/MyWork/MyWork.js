import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import "./MyWork.css";
import Check from "../../assets/images/check.png";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { GetMyIssues } from "../../service/issues/issues.service";

function MyWork({ show, handleClose }) {
  const navigate = useNavigate();
  const [showMyWorkplace, setShowMyWorkplace] = useState(false);
  const { userData, userToken } = useContext(AuthenticationContext);

  const handleMyWorkplace = () => {
    setShowMyWorkplace(false);
    navigate("/myMyWorkplace");
  };

  const [tasks, setTasks] = useState([]);

  const issueAssigneePk = userData ? userData.userPk : null;
  const page = 0;
  const size = 10;

  useEffect(() => {
    if (issueAssigneePk) {
      GetMyIssues(issueAssigneePk, page, size, userToken)
        .then((res) => {
          const todoIssues = res.data.filter((issue) => issue.issueStatus === "TODO");
          const inProgressIssues = res.data.filter((issue) => issue.issueStatus === "INPROGRESS");

          setTasks([
            {
              type: "진행중",
              issues: inProgressIssues.map((issue) => ({ content: issue.issueDescription })),
            },
            {
              type: "해야 할 일",
              issues: todoIssues.map((issue) => ({ content: issue.issueDescription })),
            },
          ]);
        })
        .catch((err) => {
          // 오류 처리 로직
        });
    }
  }, []);

  return (
    <div>
      <Offcanvas className="MyWork" show={show} onHide={handleClose} backdrop={false} placement="start">
        <Offcanvas.Header closeButton>
          <div className="header-buttons">
            <Button variant="text" className="assigned-button">
              나에게 할당
            </Button>
            <Button variant="text" className="recent-button">
              최근
            </Button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          {tasks.map((task, index) => (
            <div className="MyWork-issue-container" key={index}>
              <div className="task-type">{task.type}</div>
              {task.issues.map((issue, issueIndex) => (
                <div className="issue-container" key={issueIndex}>
                  <img src={Check} alt="Checkmark" className="checkImg" />
                  <div className="issue-content">{issue.content}</div>
                </div>
              ))}
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MyWork;
