import React, { useState } from "react";
import "./Timeline.css";
import TopicModal from "../../components/Modal/TopicModal";
import Button from "react-bootstrap/Button";
import CalendarTimeline from "react-calendar-timeline";
import moment from "moment";
import "react-calendar-timeline/lib/Timeline.css";

export const Timeline = () => {
  const [topics, setTopics] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddTopic = (topicName, startDate, endDate) => {
    const newId = topics.length + 1;
    setTopics([...topics, { id: newId, title: topicName, start_time: moment(startDate), end_time: moment(endDate), group: newId }]);
    setGroups([...groups, { id: newId, title: topicName }]);
  };

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const newTopics = topics.map((topic) => {
      if (topic.id === itemId) {
        return { ...topic, start_time: moment(dragTime), end_time: moment(dragTime + (topic.end_time - topic.start_time)) };
      } else {
        return topic;
      }
    });

    setTopics(newTopics);
  };

  const handleItemResize = (itemId, time, edge) => {
    const newTopics = topics.map((topic) => {
      if (topic.id === itemId) {
        if (edge === "left") {
          return { ...topic, start_time: moment(time) };
        } else {
          return { ...topic, end_time: moment(time) };
        }
      } else {
        return topic;
      }
    });

    setTopics(newTopics);
  };

  return (
    <div className="Timeline">
      <div className="ProjectTimelineName">Project Timeline</div>
      <CalendarTimeline
        groups={groups}
        items={topics}
        defaultTimeStart={moment().add(-12, "hour")}
        defaultTimeEnd={moment().add(12, "hour")}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
      />
      <Button className="create-topic-btn" onClick={handleShowModal}>
        Create Topic
      </Button>
      <TopicModal show={showModal} handleClose={handleCloseModal} handleAddTopic={handleAddTopic} />
    </div>
  );
};
