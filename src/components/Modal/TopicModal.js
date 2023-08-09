import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./TopicModal.css";

const TopicModal = ({ show, handleClose, handleAddTopic }) => {
  const [topicName, setTopicName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [topicAssignee, setTopicAssignee] = useState("");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함.
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    handleAddTopic(topicName, formattedStartDate, formattedEndDate, topicAssignee);
    setTopicName("");
    setStartDate(new Date());
    setEndDate(new Date());
    setTopicAssignee("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Topic 만들기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="topicName mb-3" controlId="topicName">
            <Form.Label>Topic 이름</Form.Label>
            <Form.Control type="text" value={topicName} onChange={(e) => setTopicName(e.target.value)} />
          </Form.Group>
          <Form.Group className="topicDate mb-3" controlId="topicStartDate">
            <div className="topic_date-picker-group">
              <Form.Label>시작 날짜 </Form.Label>
              <DateTimePicker value={startDate} onChange={setStartDate} />
            </div>
          </Form.Group>
          <Form.Group className="topicDate mb-3" controlId="topicEndDate">
            <div className="topic_date-picker-group">
              <Form.Label>마감 날짜</Form.Label>
              <DateTimePicker value={endDate} onChange={setEndDate} />
            </div>
          </Form.Group>
          <Form.Group className="topicAssignee mb-3" controlId="topicAssignee">
            <Form.Label>담당자</Form.Label>
            <Form.Control type="text" value={topicAssignee} onChange={(e) => setTopicAssignee(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Topic
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TopicModal;
