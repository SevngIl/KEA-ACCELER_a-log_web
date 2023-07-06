import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { LeftNavSection } from "../../navigation/LeftNavSection";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Timeline.css";

export const Timeline = () => {
  const [editing, setEditing] = useState(false);
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);

  const handleButtonClick = () => {
    setEditing(true); //text 입력 활성화
  };

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };

  const handleKeyPress = (event) => {
    //엔터키로 입력
    if (event.key === "Enter") {
      setEditing(false);
      setTopics([...topics, topic]);
      setTopic("");
    }
  };

  const renderTableHeader = () => {
    const header = ["Topic"];
    for (let i = 7; i <= 12; i++) {
      header.push(`${i}월`);
    }

    return header.map((month, index) => {
      return <th key={index}>{month}</th>;
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <LeftNavSection />
      <div className="Timeline">
        <div className="ProjectTimelineName">Project Timeline</div>
        <Table responsive>
          <thead>
            <tr>{renderTableHeader()}</tr>
          </thead>
          <tbody>
            {topics.map((topic, index) => (
              <tr key={index}>
                <td>{topic}</td>
                {Array.from({ length: 6 }).fill(<td></td>)}
              </tr>
            ))}
            <tr>
              <td>
                {editing ? (
                  <Form.Control type="text" value={topic} onChange={handleInputChange} onKeyPress={handleKeyPress} />
                ) : (
                  <Button className="create-topic-btn" onClick={handleButtonClick}>
                    Create Topic
                  </Button>
                )}
              </td>
              {Array.from({ length: 6 }).fill(<td></td>)}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};
