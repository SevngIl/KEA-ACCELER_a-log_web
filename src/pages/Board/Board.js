// ProjectBoard.js
import React, { useState } from "react";
import "./Board.css";
import IssueModal from "../../components/Modal/IssueModal";

const BoardColumn = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddIssue = (issueContent) => {
        // 이슈 추가 처리
        console.log("Issue content:", issueContent);
        setShowModal(false);
    };

    return (
        <div className="BoardColumn">
            {children}
            <button className="create-issue-btn" onClick={handleShowModal}>
                Create Issue
            </button>
            <IssueModal show={showModal} handleClose={handleCloseModal} handleAddIssue={handleAddIssue} />
        </div>
    );
};

const ProjectBoard = () => {
    const columns = ["TO DO", "IN PROGRESS", "DONE", "EMERGENCY"];

    return (
        <div className="ProjectBoard">
            <div className="ProjectBoardName">Project Board</div>
            <div className="project-board">
                {columns.map((column) => (
                    <div className="BoardColumn-wrapper" key={column}>
                        <h2 className="BoardColumn-title">{column}</h2>
                        <BoardColumn />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectBoard;
