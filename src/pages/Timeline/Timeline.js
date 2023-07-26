import React, { useState } from "react";
import "./Timeline.css";
import TopicModal from "../../components/Modal/TopicModal";
import Button from "react-bootstrap/Button";
import CalendarTimeline from "react-calendar-timeline";
import moment from "moment";
import "react-calendar-timeline/lib/Timeline.css";
import FadeIn from "../../animation/FadeIn";

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
                return { ...topic, start_time: moment(dragTime), end_time: moment(dragTime + (topic.end_time - topic.start_time)) }; // 옮긴 시간대 + 기존의 기간
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

    // 처음 화면에서 보는 날짜를 현재 시간 기준으로 과거 1년 미래 1년으로 함
    const oneYearAgo = moment().subtract(1, "year");
    const oneYearFromNow = moment().add(1, "year");

    return (
        <FadeIn className="Timeline">
            <h1 className="ProjectTimelineName">Project Timeline</h1>
            <CalendarTimeline
                key={topics.length} //추가될때마다 렌더링되게 함
                groups={groups}
                items={topics}
                defaultTimeStart={moment().add(-12, "hour")}
                defaultTimeEnd={moment().add(12, "hour")}
                onItemMove={handleItemMove}
                onItemResize={handleItemResize}
                // minTime={oneYearAgo.valueOf()}
                // maxTime={oneYearFromNow.valueOf()}
            />
            <Button className="create-topic-btn" onClick={handleShowModal}>
                Create Topic
            </Button>
            <TopicModal show={showModal} handleClose={handleCloseModal} handleAddTopic={handleAddTopic} />
        </FadeIn>
    );
};
