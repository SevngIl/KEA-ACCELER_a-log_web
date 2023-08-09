import React, { useState, useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import "./Timeline.css";
import TopicModal from "../../components/Modal/TopicModal";
import Button from "react-bootstrap/Button";
import FadeIn from "../../animation/FadeIn";

export const Timeline = () => {
  const [tasks, setTasks] = useState([
    {
      start: new Date(),
      end: new Date(),
      name: "Welcome! Please add your Topic",
      id: "Task 0",
      progress: 0,
    },
    {
      start: new Date(),
      end: new Date(),
      name: "",
      id: "Task 1",
      progress: 0,
    },

    {
      start: new Date(),
      end: new Date(),
      name: "",
      id: "Task 2",
      progress: 0,
    },
    {
      start: new Date(),
      end: new Date(),
      name: "",
      id: "Task 3",
      progress: 0,
    },
    {
      start: new Date(),
      end: new Date(),
      name: "",
      id: "Task 4",
      progress: 0,
    },
    {
      start: new Date(),
      end: new Date(),
      name: "",
      id: "Task 5",
      progress: 0,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [gantt, setGantt] = useState(null);

  const QuarterDay = useRef(null);
  const HalfDay = useRef(null);
  const Day = useRef(null);
  const Week = useRef(null);
  const Month = useRef(null);
  const Year = useRef(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddTopic = (topicName, startDate, endDate, topicAssignee) => {
    // 실제 토픽을 세는 변수
    const realTaskCount = tasks.findIndex((task) => task.name === "" || task.name === "Welcome! Please add your Topic");

    // 새로운 토픽 생성
    const newTask = {
      start: startDate,
      end: endDate,
      name: topicName,
      assignee: topicAssignee,
      id: "Task " + realTaskCount,
      progress: 0,
    };

    // 기존 토픽 복사
    const newTasks = [...tasks];

    // 더미 데이터를 모두 사용했으면 새로운 토픽을 추가
    if (realTaskCount === -1 || realTaskCount >= 6) {
      newTasks.push(newTask);
    } else {
      // 그렇지 않으면 첫 번째 더미 데이터 자리에 실제 토픽 삽입
      newTasks[realTaskCount] = newTask;
    }

    // 토픽 상태 업데이트
    setTasks(newTasks);
  };

  const changeViewMode = (mode, ref) => {
    ["Quarter Day", "Half Day", "Day", "Week", "Month", "Year"].forEach((m, idx) => {
      [QuarterDay, HalfDay, Day, Week, Month, Year][idx].current.classList.remove("active");
    });
    gantt.change_view_mode(mode);
    ref.current.classList.add("active");
  };

  useEffect(() => {
    if (tasks.length === 0 || !document.getElementById("gantt")) return;

    if (!gantt) {
      const newGantt = new Gantt("#gantt", tasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
        language: "en",
        custom_popup_html: function (task) {
          //커스텀 팝업
          const start_date = task._start.toLocaleDateString();
          const end_date = task._end.toLocaleDateString();
          return `
            <div class="details-container">
              <h5>${task.name}</h5>
              <p>Started on ${start_date}</p>
              <p>Expected to finish by ${end_date}</p>
              <p>${task.progress}% completed!</p>
              <p>Assigned to ${task.assignee}.</p>
            </div>
            `;
        },
      });
      newGantt.change_view_mode("Week");
      setGantt(newGantt);
    } else {
      gantt.refresh(tasks);
    }
  }, [tasks, gantt]);

  useEffect(() => {
    if (!gantt) return;

    const handleQuarterDayClick = () => changeViewMode("Quarter Day", QuarterDay);
    const handleHalfDayClick = () => changeViewMode("Half Day", HalfDay);
    const handleDayClick = () => changeViewMode("Day", Day);
    const handleWeekClick = () => changeViewMode("Week", Week);
    const handleMonthClick = () => changeViewMode("Month", Month);
    const handleYearClick = () => changeViewMode("Year", Year);

    QuarterDay.current.addEventListener("click", handleQuarterDayClick);
    HalfDay.current.addEventListener("click", handleHalfDayClick);
    Day.current.addEventListener("click", handleDayClick);
    Week.current.addEventListener("click", handleWeekClick);
    Month.current.addEventListener("click", handleMonthClick);
    Year.current.addEventListener("click", handleYearClick);

    return () => {
      QuarterDay.current?.removeEventListener("click", handleQuarterDayClick);
      HalfDay.current?.removeEventListener("click", handleHalfDayClick);
      Day.current?.removeEventListener("click", handleDayClick);
      Week.current?.removeEventListener("click", handleWeekClick);
      Month.current?.removeEventListener("click", handleMonthClick);
      Year.current?.removeEventListener("click", handleYearClick);
    };
  }, [gantt]);

  return (
    <FadeIn className="Timeline">
      <h1 className="ProjectTimelineName">Project Timeline</h1>
      <div className="ViewMode-button-container">
        <button ref={QuarterDay} className="ViewMode-button" id="quarter-day">
          Quarter Day
        </button>
        <button ref={HalfDay} className="ViewMode-button" id="half-day">
          Half Day
        </button>
        <button ref={Day} className="ViewMode-button" id="day">
          Day
        </button>
        <button ref={Week} className="ViewMode-button" id="week">
          Week
        </button>
        <button ref={Month} className="ViewMode-button" id="month">
          Month
        </button>
        <button ref={Year} className="ViewMode-button" id="year">
          Year
        </button>
      </div>
      <div id="gantt"></div>
      <Button className="create-topic-btn" onClick={handleShowModal}>
        Create Topic
      </Button>
      <TopicModal show={showModal} handleClose={handleCloseModal} handleAddTopic={handleAddTopic} />
    </FadeIn>
  );
};
