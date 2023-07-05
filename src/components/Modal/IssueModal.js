import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const IssueModal = ({ show, handleClose, handleAddIssue }) => {
  const [issueContent, setIssueContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [issueStatus, setIssueStatus] = useState("To Do");

  const handleSubmit = () => {
    handleAddIssue(issueContent);
    setIssueContent("");
    setSelectedFile(null);
    setPreviewSource(null);
    setIssueStatus("To Do");
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
          <Form.Group controlId="issueContent">
            <Form.Label>이슈 내용</Form.Label>
            <Form.Control as="textarea" rows={1} value={issueContent} onChange={(e) => setIssueContent(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="issueStatus">
            <Form.Label>상태</Form.Label>
            <Form.Select value={issueStatus} onChange={(e) => setIssueStatus(e.target.value)}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="issueFile">
            <Form.Label>첨부 파일</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          {previewSource && <img src={previewSource} alt="chosen" style={{ height: "100px" }} />}
        </Form>
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
