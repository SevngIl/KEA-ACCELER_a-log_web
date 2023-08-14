import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./TopicModal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CreateTopic, UpdateTopic, DeleteTopic } from "../../service/projects/projects.service";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { useContext } from "react";

const TopicModal = ({ show, handleClose, handleAddTopic, handleUpdateTopic, handleDeleteTopic, projectPk, selectedTopic }) => {
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

    if (selectedTopic) {
      const topicId = selectedTopic.id; // "Task " + realTaskCount 형태
      const topicPk = parseInt(topicId.replace(/\D/g, ""), 10); // 숫자만 추출

      try {
        const response = await UpdateTopic({
          projectPk,
          topicPk,
          name: topicName,
          description: topicDescription,
          startDate: `${formattedStartDate}T00:00:00.000Z`,
          dueDate: `${formattedEndDate}T00:00:00.000Z`,
          userToken,
        });

        if (response.data.code === 200) {
          toast.success("토픽이 성공적으로 수정되었습니다.");
          handleUpdateTopic(topicName, formattedStartDate, formattedEndDate, topicDescription);
        }
      } catch (error) {
        console.error("토픽 수정 중 오류 발생:", error.response ? error.response.data : error.message);
        toast.error("토픽 수정 중 오류가 발생했습니다.");
      }
    } else {
      try {
        const response = await CreateTopic({
          projectPk,
          name: topicName,
          description: topicDescription,
          startDate: `${formattedStartDate}T00:00:00.000Z`,
          dueDate: `${formattedEndDate}T00:00:00.000Z`,
          userToken,
        });

        if (response.data.code === 201) {
          toast.success("새로운 토픽이 생성되었습니다.");
          handleAddTopic(topicName, formattedStartDate, formattedEndDate, topicDescription);
        }
      } catch (error) {
        console.error("토픽 생성 중 오류 발생:", error.response ? error.response.data : error.message);
        toast.error("토픽 생성 중 오류가 발생했습니다.");
      }
    }

    setTopicName("");
    setStartDate(new Date());
    setEndDate(new Date());
    setTopicDescription("");
    handleClose();
  };

  const handleDelete = async () => {
    const topicId = selectedTopic.id;
    const topicPk = parseInt(topicId.replace(/\D/g, ""), 10);

    try {
      const response = await DeleteTopic({ projectPk, topicPk, userToken });

      if (response.data.code === 204) {
        toast.success("토픽이 성공적으로 삭제되었습니다.");
        handleDeleteTopic(selectedTopic);
        console.log("토픽 삭제 응답:", response);
      }
    } catch (error) {
      console.error("토픽 삭제 중 오류 발생:", error.response ? error.response.data : error.message);
      toast.error("토픽 삭제 중 오류가 발생했습니다.");
    }

    handleClose(); // 모달 닫기
  };

  useEffect(() => {
    if (!show) {
      // 모달이 닫히면 상태 초기화
      setTopicName("");
      setStartDate(new Date());
      setEndDate(new Date());
      setTopicDescription("");
    } else if (selectedTopic) {
      // 모달이 열리면서 선택된 토픽이 있으면 상태 설정
      setTopicName(selectedTopic.name);
      setStartDate(new Date(selectedTopic.start));
      setEndDate(new Date(selectedTopic.end));
      setTopicDescription(selectedTopic.description);
    }
  }, [show, selectedTopic]);

  return (
    <div className="TopicModal">
      <ToastContainer />
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
          <div className="Topic-modal-buttons">
            {selectedTopic && (
              <Button className="Topic-delete-button" variant="danger" onClick={handleDelete}>
                Delete Topic
              </Button>
            )}
            <Button className="Topic-close-button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className="Topic-update-button" variant="primary" onClick={handleSubmit}>
              {selectedTopic ? "Update Topic" : "Create Topic"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TopicModal;
