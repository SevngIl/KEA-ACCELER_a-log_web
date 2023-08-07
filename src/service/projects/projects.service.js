import axios from "axios";

const PROJECT_API_URL = process.env.REACT_APP_PROJECT_API_URL;

export const PostCreateProjects = async (projectName, description, teamPk, pmPk) => {
  const projectData = {
    name: projectName,
    description: description,
    teamPk: teamPk,
    pmPk: pmPk,
  };

  console.log("Request body:", projectData);

  try {
    const res = await axios.post(`${PROJECT_API_URL}/api/projects`, projectData);
    console.log(res);
    return res;
  } catch (err) {
    console.error("프로젝트 생성 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 생성 중 오류가 발생했습니다.");
  }
};

export const GetProjects = async (keyword, sortType, page, size) => {
  try {
    const res = await axios.get(`${PROJECT_API_URL}/api/projects`, {
      params: {
        keyword,
        sortType,
        page,
        size,
      },
    });
    console.log("Response:", res);
    return res;
  } catch (err) {
    console.error("프로젝트 조회 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 조회 중 오류가 발생했습니다.");
  }
};

export const GetProjectDetail = async (projectPk) => {
  try {
    const res = await axios.get(`${PROJECT_API_URL}/api/projects/${projectPk}`);
    console.log("Response:", res);
    return res;
  } catch (err) {
    console.error("프로젝트 조회 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 조회 중 오류가 발생했습니다.");
  }
};
