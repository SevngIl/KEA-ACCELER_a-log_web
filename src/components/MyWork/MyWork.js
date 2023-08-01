import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import "./MyWork.css";
import Check from "../../assets/images/check.png";

function MyWork({ show, handleClose }) {
  const navigate = useNavigate();
  const [showMyWorkplace, setShowMyWorkplace] = useState(false);

  const handleMyWorkplace = () => {
    setShowMyWorkplace(false);
    navigate("/myMyWorkplace");
  };

  const tasks = [
    {
      type: "진행중",
      issues: [
        {
          content: "객관식 답변 처리",
        },
        {
          content: "주관식 답변 처리",
        },
      ],
    },
    {
      type: "해야 할 일",
      issues: [
        {
          content: "통계 페이지 구현",
        },
        {
          content: "커뮤니티 페이지 구현",
        },
      ],
    },
  ];

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
            <div key={index}>
              <div className="task-type">{task.type}</div>
              {task.issues.map((issue, issueIndex) => (
                <div className="issue-container" key={issueIndex}>
                  <img src={Check} alt="Checkmark" className="checkImg" />
                  <div className="issue-content">{issue.content}</div>
                </div>
              ))}
            </div>
          ))}
          <div className="button-container">
            <Button variant="text" onClick={handleMyWorkplace}>
              내 작업 페이지로 이동
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MyWork;
