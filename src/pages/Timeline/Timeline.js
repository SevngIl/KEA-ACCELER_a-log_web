import React, { useState, useEffect, useRef, useContext } from "react";
import Gantt from "frappe-gantt";
import "./Timeline.css";
import TopicModal from "../../components/Modal/TopicModal";
import Button from "react-bootstrap/Button";
import FadeIn from "../../animation/FadeIn";
import { useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { GetAllTopics, GetTopicDetail, UpdateTopic } from "../../service/projects/projects.service";

export const Timeline = () => {
  const location = useLocation();
  const [projectPk, setProjectPk] = useState(location.pathname.split("/")[2]);
  const { userToken } = useContext(AuthenticationContext);

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

  const changeViewMode = (mode, ref) => {
    ["Quarter Day", "Half Day", "Day", "Week", "Month", "Year"].forEach((m, idx) => {
      [QuarterDay, HalfDay, Day, Week, Month, Year][idx].current.classList.remove("active");
    });
    gantt.change_view_mode(mode);
    ref.current.classList.add("active");
  };

  const handleShowModal = () => {
    setSelectedTopic(null); // Create Topic 버튼을 누를 때 selectedTopic을 null로 설정
    setShowModal(true);
  };

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [reloadTopics, setReloadTopics] = useState(false);

  const handleDoubleClick = async (task) => {
    try {
      const topicPk = task.id.split(" ")[1]; // "Task 21"에서 "21"을 추출

      const res = await GetTopicDetail({ projectPk, topicPk, userToken });

      const selectedTopicDetail = {
        start: new Date(res.data.data.startDate),
        end: new Date(res.data.data.dueDate),
        name: res.data.data.name,
        id: "Task " + res.data.data.pk,
        progress: 0,
        description: res.data.data.description,
      };

      setSelectedTopic(selectedTopicDetail);
      setShowModal(true);
    } catch (error) {
      console.error("토픽 세부 정보 가져오기 실패", error.message);
      // 필요한 경우 에러 처리를 여기에 추가합니다.
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTopic(null);
  };

  const handleAddTopic = (topicName, topicDescription, startDate, endDate, projectPk) => {
    // 실제 토픽을 세는 변수
    const realTaskCount = tasks.findIndex((task) => task.name === "" || task.name === "Welcome! Please add your Topic");

    // 새로운 토픽 생성
    const newTask = {
      start: startDate,
      end: endDate,
      name: topicName,
      description: topicDescription,
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
    fetchTopics();
    setReloadTopics(true);
  };

  const handleUpdateTopic = (name, startDate, endDate, description) => {
    const updatedTasks = tasks.map((task) => (task === selectedTopic ? { name, start: startDate, end: endDate, description } : task));
    setTasks(updatedTasks);
    setReloadTopics(true);
  };

  const [deletedTopics, setDeletedTopics] = useState([]);

  const handleDeleteTopic = (topic) => {
    const updatedDeletedTopics = [...deletedTopics, topic];
    setDeletedTopics(updatedDeletedTopics);

    const updatedTasks = tasks.filter((task) => task.id !== topic.pk);
    setTasks(updatedTasks);
    fetchTopics();
    setReloadTopics(true);
  };

  const fetchTopics = async () => {
    try {
      const params = { projectPk, keyword: "", sortType: "ASC", page: 0, size: 100, userToken: userToken };
      const res = await GetAllTopics(params);
      console.log("API Response:", res.data);
      const topics = res.data.data.content.map((topic) => ({
        start: new Date(topic.startDate),
        end: new Date(topic.dueDate),
        name: topic.name,
        id: "Task " + topic.pk,
        progress: 0,
        description: topic.description,
      }));
      setTasks(topics);
    } catch (error) {
      console.error("토픽 불러오기 실패", error);
    }
  };

  const formatDateTime = (date) => {
    date.setHours(date.getHours() + 9);
    return date.toISOString().slice(0, 19);
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
        on_date_change: async (task, start, end) => {
          try {
            const topicPk = task.id.split(" ")[1];
            const startDate = formatDateTime(new Date(start));
            const endDate = formatDateTime(new Date(end));

            if (!projectPk || !topicPk) {
              console.error("projectPk or topicPk is undefined.");
              return;
            }

            console.log("projectPk: ", projectPk);
            console.log("topicPk:", topicPk);
            console.log("name: ", task.name);
            console.log("des: ", task.description);
            console.log("start: ", startDate);
            console.log("end: ", endDate);
            console.log("userToken: ", userToken);

            await UpdateTopic({
              projectPk: parseInt(projectPk),
              topicPk: parseInt(topicPk),
              name: task.name,
              description: task.description,
              startDate: startDate,
              dueDate: endDate,
              userToken: userToken,
            });
            console.log("토픽 기간이 성공적으로 업데이트되었습니다.");
          } catch (error) {
            console.error("토픽 기간 업데이트 중 오류 발생:", error.message);
          }
        },

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
              <p>${task.description}.</p>
              <p>${task.id}.</p>
            </div>
            `;
        },
        on_click: (task) => handleDoubleClick(task),
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

  useEffect(() => {
    fetchTopics();
  }, [projectPk]);

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
      <TopicModal
        show={showModal}
        handleClose={handleCloseModal}
        handleAddTopic={handleAddTopic}
        handleUpdateTopic={handleUpdateTopic}
        handleDeleteTopic={handleDeleteTopic}
        projectPk={projectPk}
        selectedTopic={selectedTopic}
      />
    </FadeIn>
  );
};
