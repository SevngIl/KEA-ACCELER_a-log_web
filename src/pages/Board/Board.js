import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Board.css";
import IssueModal from "../../components/Modal/IssueModal";
import { LeftNavSection } from "../../navigation/LeftNavSection";

const BoardColumn = ({ column, issues, handleAddIssue }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Droppable droppableId={column}>
      {(provided, snapshot) => (
        <div className={`BoardColumn ${snapshot.isDraggingOver ? "shadow-lg" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
          {issues[column].map((issue, index) => (
            <Draggable key={issue.id} draggableId={`draggable-${issue.id}`} index={index}>
              {(provided, snapshot) => (
                <div
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
          <button className="create-issue-btn" onClick={handleShowModal}>
            Create Issue
          </button>
          <IssueModal show={showModal} handleClose={handleCloseModal} handleAddIssue={handleAddIssue} column={column} />
        </div>
      )}
    </Droppable>
  );
};

const Board = () => {
  const columns = ["TO DO", "IN PROGRESS", "DONE", "EMERGENCY"];
  const [issues, setIssues] = useState({ "TO DO": [], "IN PROGRESS": [], DONE: [], EMERGENCY: [] });

  const handleAddIssue = (issueContent, issueStatus, imageDataUrl) => {
    // 새 이슈 객체를 생성
    const newIssue = { id: `${issueStatus}-${new Date().getTime()}`, content: issueContent, status: issueStatus, imageDataUrl };

    // 새 이슈를 적절한 리스트에 추가
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="ProjectBoard">
        <div className="ProjectBoardName">Project Board</div>
        <div className="project-board">
          {columns.map((column) => (
            <div className="BoardColumn-wrapper" key={column}>
              <h2 className="BoardColumn-title">{column}</h2>
              <BoardColumn column={column} issues={issues} handleAddIssue={handleAddIssue} />
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
