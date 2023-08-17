import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./IssueModal.css";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { PostCreateIssue, UpdateIssueImage, UpdateIssueDate, UpdateIssueAssignee, RemoveIssueImage } from "../../service/issues/issues.service";
import { GetProjectMembers } from "../../service/projects/projects.service";

const IssueModal = ({ issue, show, handleClose, handleAddIssue, isEditing, column, teamPk, projectPk }) => {
  const { userToken, userData } = useContext(AuthenticationContext);

  const [issueContent, setIssueContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [issueStatus, setIssueStatus] = useState("TODO");
  const [assignee, setAssignee] = useState("할당되지 않음");
  const reporter = userData.userNN;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [projectMembers, setProjectMembers] = useState([]);

  useEffect(() => {
    if (isEditing && issue) {
      setIssueContent(issue.content);
      setPreviewSource(issue.imageDataUrl);
      setIssueStatus(issue.status);

      // projectMembers에서 issueAssigneePk와 일치하는 멤버 찾기
      const matchingAssignee = projectMembers.find((member) => member.userPk === issue.issueAssigneePk);
      setAssignee(matchingAssignee ? matchingAssignee.userNN : "할당되지 않음");
      // setAssignee(issue.assignee);
      setStartDate(issue.startDate);
      setEndDate(issue.endDate);
    } else {
      // 이 부분은 새 이슈를 만들거나 다른 이슈를 선택했을 때 초기화를 위함
      setIssueContent("");
      setSelectedFile(null);
      setPreviewSource(null);
      setIssueStatus(column);
      setAssignee("할당되지 않음");
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }, [isEditing, issue, projectMembers]);

  useEffect(() => {
    if (isEditing && issue) {
      // startDate나 endDate가 변경될 때마다 UpdateIssueDate API를 호출
      console.log("issuePk:", issue.issuePk);
      console.log("StartDate:", startDate);
      console.log("endDate: ", endDate);
      console.log("userToken: ", userToken);

      const updateDate = async () => {
        try {
          await UpdateIssueDate(issue.issuePk, startDate, endDate, userToken);
          console.log("날짜가 성공적으로 업데이트되었습니다.");
        } catch (error) {
          console.error("이슈 날짜 업데이트 중 오류 발생:", error);
        }
      };

      updateDate();
    }
  }, [startDate, endDate, isEditing, issue, userToken]); // startDate, endDate의 변화를 감지

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const response = await GetProjectMembers(projectPk, "", 0, 100, userToken);
        console.log("Project Members Response:", response);
        setProjectMembers(response.data.data.content);
        console.log(response.data.data.content);
      } catch (error) {
        console.error("프로젝트 멤버 가져오기에 실패했습니다:", error);
      }
    };

    fetchProjectMembers();
  }, [projectPk, userToken, isEditing]);

  useEffect(() => {
    const updateAssignee = async () => {
      if (isEditing && issue) {
        try {
          // 현재 선택된 담당자의 PK 값을 얻어야 함. projectMembers에서 얻을 수 있을 것 같습니다.
          const selectedAssigneePk = projectMembers.find((member) => member.userNN === assignee)?.userPk;
          if (selectedAssigneePk) {
            await UpdateIssueAssignee(issue.issuePk, selectedAssigneePk, userToken);
            console.log("담당자가 성공적으로 업데이트되었습니다.");
          } else {
            console.warn("선택된 담당자의 PK 값을 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("담당자 업데이트 중 오류 발생:", error);
        }
      }
    };

    updateAssignee();
  }, [assignee, isEditing, issue, projectMembers, userToken]); // assignee의 변화를 감지

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);

    try {
      // 이미지 수정 API 호출
      await UpdateIssueImage(issue.issuePk, file, userToken);
      console.log("이미지가 성공적으로 수정되었습니다.");
    } catch (err) {
      console.error("이미지 수정에 실패했습니다:", err);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = async () => {
    const issueData = {
      pjPk: projectPk,
      teamPk: teamPk,
      topicPk: 1, // topicPk 임시로 설정
      issueAuthorPk: 1,
      issueContent: issueContent,
      issueStatus: issueStatus,
      issueLabel: "NONE",
      issueAssigneePk: 1,
      issueId: "Id 1",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      // API 호출
      await PostCreateIssue(selectedFile, issueData, userToken);

      // 성공적으로 완료된 후 처리
      handleAddIssue(issueContent, issueStatus, previewSource, assignee, reporter, startDate, endDate);
      setIssueContent("");
      setSelectedFile(null);
      setPreviewSource(null);
      setIssueStatus("TODO");
      setAssignee("할당되지 않음");
      setStartDate(new Date());
      setEndDate(new Date());
      handleClose();
    } catch (err) {
      console.error("이슈 생성에 실패했습니다:", err);
    }
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
              <option value="TODO">TO DO</option>
              <option value="INPROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
              <option value="EMERGENCY">EMERGENCY</option>
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
            {projectMembers &&
              projectMembers.length > 0 &&
              projectMembers.map((member) => (
                <option value={member.userNN} key={member.userPk}>
                  {member.userNN}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="issueReporter mb-3" controlId="issueReporter">
          <Form.Label>보고자</Form.Label>
          <Form.Control type="text" readOnly value={reporter} disabled />
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
        {isEditing ? null : (
          <Button variant="primary" onClick={() => handleSubmit(issueContent, issueStatus)}>
            Create Issue
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default IssueModal;
