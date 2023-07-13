import React, { useState } from "react";
import "./Board.css";
import IssueModal from "../../components/Modal/IssueModal";
import { LeftNavSection } from "../../navigation/LeftNavSection";

const BoardColumn = ({ column, issues, handleAddIssue }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="BoardColumn">
            {issues[column].map((issue, index) => (
                <div className="BoardIssue" key={index}>
                    <div className="BoardIssueContent">{issue.content} </div>
                    <div className="BoardIssueIMG">{issue.imageDataUrl && <img src={issue.imageDataUrl} alt="issue" style={{ width: "100px", height: "100px" }} />}</div>
                </div>
            ))}
            <button className="create-issue-btn" onClick={handleShowModal}>
                Create Issue
            </button>
            <IssueModal show={showModal} handleClose={handleCloseModal} handleAddIssue={handleAddIssue} column={column} />
        </div>
    );
};

const Board = () => {
    const columns = ["TO DO", "IN PROGRESS", "DONE", "EMERGENCY"];
    const [issues, setIssues] = useState({ "TO DO": [], "IN PROGRESS": [], DONE: [], EMERGENCY: [] });

    const handleAddIssue = (issueContent, issueStatus, imageDataUrl) => {
        // 새 이슈 객체를 생성
        const newIssue = { content: issueContent, status: issueStatus, imageDataUrl };

        // 새 이슈를 적절한 리스트에 추가
        setIssues((prevIssues) => ({
            ...prevIssues,
            [issueStatus]: [...prevIssues[issueStatus], newIssue],
        }));
    };
    return (
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
    );
};

export default Board;
