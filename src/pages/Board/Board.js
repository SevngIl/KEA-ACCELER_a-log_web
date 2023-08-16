import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Board.css";
import IssueModal from "../../components/Modal/IssueModal";
import { LeftNavSection } from "../../navigation/LeftNavSection";
import { FloatingWrapper } from "../../components/FloatingWrapper";
import { Button } from "react-bootstrap";
import FadeIn from "../../animation/FadeIn";
import { useLocation } from "react-router-dom";
import { GetIssue, PostCreateIssue, GetAllIssues } from "../../service/issues/issues.service";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

const BoardColumn = ({ column, issues, handleShowIssueModal }) => {
  return (
    <Droppable droppableId={column}>
      {(provided, snapshot) => (
        <FloatingWrapper
          borderRadius="16px"
          className={`BoardColumn ${snapshot.isDraggingOver ? "shadow-lg" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {issues[column].map((issue, index) => (
            <Draggable key={issue.id} draggableId={`draggable-${issue.id}`} index={index}>
              {(provided, snapshot) => (
                <div
                  onClick={() => handleShowIssueModal(column, index)}
                  className={`BoardIssue ${snapshot.isDragging ? "bg-opacity-90 shadow-2xl shadow-gray-400" : ""}`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{ ...provided.draggableProps.style }}
                >
                  <div className="BoardIssueContent">{issue.content}</div>
                  <div className="BoardIssueIMG">
                    {issue.imageDataUrl && <img src={issue.imageDataUrl} alt="issue" style={{ width: "100px", height: "100px" }} />}
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <button className="create-issue-btn" onClick={() => handleShowIssueModal(column)}>
            Create Issue
          </button>
        </FloatingWrapper>
      )}
    </Droppable>
  );
};

const Board = () => {
  const columns = ["TODO", "INPROGRESS", "DONE", "EMERGENCY"];
  const [issues, setIssues] = useState({ TODO: [], INPROGRESS: [], DONE: [], EMERGENCY: [] });
  const [showModal, setShowModal] = useState(false); // 모달을 표시할지 여부
  const [selectedColumn, setSelectedColumn] = useState(null); // 선택된 컬럼
  const [selectedIndex, setSelectedIndex] = useState(null); // 선택된 인덱스
  const location = useLocation();
  const [teamPk, setTeamPk] = useState(location.pathname.split("/")[1]);
  const [projectPk, setProjectPk] = useState(location.pathname.split("/")[2]);
  const { userToken } = useContext(AuthenticationContext);

  // 이슈 클릭을 처리하는 함수
  const handleShowIssueModal = (column, index) => {
    setSelectedColumn(column);
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedColumn(null);
    setSelectedIndex(null);
    setShowModal(false);
  };

  const modifyLink = (url) => {
    // 슬래시 2개를 기준으로 뒷부분만 사용
    const urlObj = new URL(url);
    const path = urlObj.pathname.split("//")[1];
    // 앞부분에 https://alog.acceler.kr/를 붙이기
    const newUrl = "https://alog.acceler.kr/" + path;
    return newUrl;
  };

  const handleAddIssue = (issueContent, issueStatus, imageDataUrl, assignee, reporter, startDate, endDate, teamPk, projectPk) => {
    // 새 이슈 객체를 생성
    const newIssue = {
      id: `${issueStatus}-${new Date().getTime()}`,
      content: issueContent,
      status: issueStatus,
      imageDataUrl,
      assignee,
      reporter,
      startDate,
      endDate,
      teamPk,
      projectPk,
    };

    // 새 이슈를 리스트에 추가
    setIssues((prevIssues) => ({
      ...prevIssues,
      [issueStatus]: [...prevIssues[issueStatus], newIssue],
    }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const newIssue = { ...issues[source.droppableId][source.index], status: destination.droppableId };

      setIssues((prevIssues) => {
        const newIssues = { ...prevIssues };

        newIssues[source.droppableId].splice(source.index, 1);
        newIssues[destination.droppableId].splice(destination.index, 0, newIssue);

        return newIssues;
      });
    } else {
      const newIssues = Array.from(issues[source.droppableId]);
      const [removed] = newIssues.splice(source.index, 1);
      newIssues.splice(destination.index, 0, removed);

      setIssues((prevIssues) => ({
        ...prevIssues,
        [source.droppableId]: newIssues,
      }));
    }
  };

  const fetchIssues = async () => {
    try {
      // userToken은 적절한 방법으로 얻어야 합니다.
      const response = await GetAllIssues(projectPk, 0, 100, userToken);
      const issuesData = response.data;

      const categorizedIssues = { TODO: [], INPROGRESS: [], DONE: [], EMERGENCY: [] };
      issuesData.forEach((issue) => {
        const status = issue.issueStatus.toUpperCase();
        let imageDataUrl = issue.fileLink;

        // 이미지 URL이 존재하면 modifyLink 함수로 수정
        if (imageDataUrl) {
          imageDataUrl = modifyLink(imageDataUrl);
        }

        if (categorizedIssues[status]) {
          categorizedIssues[status].push({
            id: `draggable-${issue.issuePk}`,
            content: issue.issueDescription,
            imageDataUrl: imageDataUrl,
          });
        }
      });
      setIssues(categorizedIssues);
    } catch (err) {
      console.error("이슈를 불러오는 중 오류가 발생했습니다.", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [projectPk]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <FadeIn className="ProjectBoard" childClassName="childClassName">
        <h1 className="ProjectBoardName">Project Board</h1>
        <div className="project-board">
          {columns.map((column) => (
            <div className="BoardColumn-wrapper" key={column}>
              <h2 className="BoardColumn-title">{column}</h2>
              <BoardColumn column={column} issues={issues} handleShowIssueModal={handleShowIssueModal} />
            </div>
          ))}
        </div>
      </FadeIn>
      <IssueModal
        isEditing={selectedColumn && selectedIndex !== null}
        issue={selectedColumn && selectedIndex !== null ? issues[selectedColumn][selectedIndex] : null}
        show={showModal}
        handleClose={handleCloseModal}
        handleAddIssue={handleAddIssue}
        column={selectedColumn}
        teamPk={teamPk}
        projectPk={projectPk}
      />
    </DragDropContext>
  );
};

export default Board;
