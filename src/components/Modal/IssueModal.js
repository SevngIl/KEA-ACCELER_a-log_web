import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./IssueModal.css";

const IssueModal = ({ show, handleClose, handleAddIssue }) => {
  const [issueContent, setIssueContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [issueStatus, setIssueStatus] = useState("To Do");
  const [assignee, setAssignee] = useState("할당되지 않음");
  const reporter = "한승일";
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = () => {
    handleAddIssue(issueContent);
    setIssueContent("");
    setSelectedFile(null);
    setPreviewSource(null);
    setIssueStatus("To Do");
    setAssignee("할당되지 않음");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>이슈 만들기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="issueContent mb-3" controlId="issueContent">
            <Form.Label>이슈 내용</Form.Label>
            <Form.Control as="textarea" rows={1} value={issueContent} onChange={(e) => setIssueContent(e.target.value)} />
          </Form.Group>
          <Form.Group className="issueStatus mb-3" controlId="issueStatus">
            <Form.Label>상태</Form.Label>
            <Form.Select value={issueStatus} onChange={(e) => setIssueStatus(e.target.value)}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="issueFile mb-3" controlId="issueFile">
            <Form.Label>첨부 파일</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          {previewSource && <img src={previewSource} alt="chosen" style={{ height: "100px" }} />}
        </Form>
        <Form.Group className="issueAssignee mb-3" controlId="issueAssignee">
          <Form.Label>담당자</Form.Label>
          <Form.Select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
            <option value="할당되지 않음">할당되지 않음</option>
            <option value="한승일">한승일</option>
            <option value="이지민">이지민</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="issueReporter mb-3" controlId="issueReporter">
          <Form.Label>보고자</Form.Label>
          <Form.Control type="text" readOnly value={reporter} />
        </Form.Group>
        <Form.Group className="issueDate mb-3" controlId="issueStartDate">
          <div className="issue_date-picker-group">
            <Form.Label>시작 날짜 </Form.Label>
            <DateTimePicker value={startDate} onChange={setStartDate} />
          </div>
        </Form.Group>
        <Form.Group className="issueDate mb-3" controlId="issueDueDate">
          <div className="issue_date-picker-group">
            <Form.Label>마감 날짜</Form.Label>
            <DateTimePicker value={endDate} onChange={setEndDate} />
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Issue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IssueModal;
