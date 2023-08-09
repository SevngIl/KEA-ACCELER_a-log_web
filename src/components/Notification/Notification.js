import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Notification.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Check from "../../assets/images/check.png";

function Notification({ show, handleClose }) {
  const navigate = useNavigate();

  const [showViewAll, setShowViewAll] = useState(false);

  const handleViewAll = () => {
    setShowViewAll(false);
    navigate("/myIssues");
  };

  const alarms = [
    {
      date: "2023-07-27",
      issues: [
        {
          message: "Faker이(가) 귀하에게 이슈를 할당",
          time: "5분 전",
          content: "주관식 답변 처리",
          status: "해야 할 일",
        },
      ],
    },
  ];

  return (
    <div>
      <Offcanvas className="Notification" show={show} onHide={handleClose} backdrop={false} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>알림</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          {alarms.map((alarm, index) => (
            <div key={index}>
              <div className="issue-date">{alarm.date}</div>
              {alarm.issues.map((issue, issueIndex) => (
                <div className="issue-container" key={issueIndex}>
                  <div className="issue-msg-time">
                    <div className="issue-msg">{issue.message} </div> <div className="issue-time">{issue.time} </div>
                  </div>
                  <div className="issue-img-content">
                    <img src={Check} alt="Checkmark" className="checkImg" />
                    <div className="issue-content">{issue.content}</div>
                  </div>

                  <div className="issue-status">● {issue.status}</div>
                </div>
              ))}
            </div>
          ))}
          <div className="button-container">
            <Button variant="primary" onClick={handleViewAll}>
              모두 보기
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Notification;
