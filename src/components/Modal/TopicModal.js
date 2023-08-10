import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./TopicModal.css";
import { toast } from "react-toastify";
import { CreateTopic } from "../../service/projects/projects.service";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { useContext } from "react";

const TopicModal = ({ show, handleClose, handleAddTopic, projectPk, selectedTopic }) => {
  // const [topicName, setTopicName] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  // const [topicDescription, setTopicDescription] = useState("");
  const [topicName, setTopicName] = useState(selectedTopic ? selectedTopic.name : "");
  const [startDate, setStartDate] = useState(selectedTopic ? new Date(selectedTopic.start) : new Date());
  const [endDate, setEndDate] = useState(selectedTopic ? new Date(selectedTopic.end) : new Date());
  const [topicDescription, setTopicDescription] = useState(selectedTopic ? selectedTopic.description : "");

  const { userToken } = useContext(AuthenticationContext);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함.
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    try {
      // API 호출
      const response = await CreateTopic({
        projectPk: projectPk,
        name: topicName,
        description: topicDescription,
        startDate: `${formattedStartDate}T00:00:00.000Z`,
        dueDate: `${formattedEndDate}T00:00:00.000Z`,
        userToken, // 사용자 토큰을 CreateTopic 함수에 전달
      });

      // 성공 시 로직
      if (response.data.code === 201) {
        toast.success("새로운 토픽이 생성되었습니다."); // 성공 알림
        handleAddTopic(topicName, formattedStartDate, formattedEndDate, topicDescription);
      }
    } catch (error) {
      console.error("토픽 생성 중 오류 발생:", error.response ? error.response.data : error.message);
      toast.error("토픽 생성 중 오류가 발생했습니다."); // 실패 알림
    }

    // handleAddTopic(topicName, formattedStartDate, formattedEndDate, topicDescription);
    setTopicName("");
    setStartDate(new Date());
    setEndDate(new Date());
    setTopicDescription("");
    handleClose();
  };

  useEffect(() => {
    if (selectedTopic) {
      setTopicName(selectedTopic.name);
      setTopicDescription(selectedTopic.description);
      setStartDate(selectedTopic.start);
      setEndDate(selectedTopic.end);
    }
  }, [selectedTopic]);

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
          <Form.Group className="topicDescription mb-3" controlId="topicDescription">
            <Form.Label>설명</Form.Label>
            <Form.Control type="text" value={topicDescription} onChange={(e) => setTopicDescription(e.target.value)} />
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
