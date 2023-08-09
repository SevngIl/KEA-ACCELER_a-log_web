import axios from "axios";

const PROJECT_API_URL = process.env.REACT_APP_PROJECT_API_URL;
const API_URL = process.env.REACT_APP_ALOG_API_URL;

export const PostCreateProjects = async (projectName, description, teamPk, pmPk, userToken) => {
  const projectData = {
    name: projectName,
    description: description,
    teamPk: teamPk,
    pmPk: pmPk,
  };
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  console.log("Request body:", projectData);

  try {
    const res = await axios.post(`${PROJECT_API_URL}/api/projects`, projectData, options);
    console.log(res);
    return res;
  } catch (err) {
    console.error("프로젝트 생성 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 생성 중 오류가 발생했습니다.");
  }
};

// export const GetProjects = async (keyword, sortType, page, size) => {
//   try {
//     const res = await axios.get(`${PROJECT_API_URL}/api/projects?sortType=${sortType}&page=${page}&size=${size}`);
//     console.log("Response:", res);
//     return res;
//   } catch (err) {
//     console.error("프로젝트 조회 중 오류 발생:", err.response ? err.response.data : err.message);
//     throw new Error("프로젝트 조회 중 오류가 발생했습니다.");
//   }
// };

export const GetProjects = async (keyword, sortType, page, size, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  console.log(userToken);

  try {
    const res = await axios.get(`${PROJECT_API_URL}/api/projects?sortType=${sortType}&page=${page}&size=${size}`, options);
    console.log("Response:", res);
    return res;
  } catch (err) {
    console.error("프로젝트 조회 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 조회 중 오류가 발생했습니다.");
  }
};

export const GetProjectDetail = async (projectPk, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    const res = await axios.get(`${PROJECT_API_URL}/api/projects/${projectPk}`, options);
    console.log("Response:", res.data);
    return res;
  } catch (err) {
    console.error("프로젝트 조회 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 조회 중 오류가 발생했습니다.");
  }
};

export const PatchUpdateProject = async (projectPk, name, description, teamPk, pmPk, userToken) => {
  const projectData = {
    name,
    description,
    teamPk,
    pmPk,
  };
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  console.log("Request body:", projectData);

  try {
    const res = await axios.patch(`${PROJECT_API_URL}/api/projects/${projectPk}`, projectData, options);
    console.log(res);
    return res;
  } catch (err) {
    console.error("프로젝트 수정 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 수정 중 오류가 발생했습니다.");
  }
};

export const DeleteProject = async (projectPk, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    const res = await axios.delete(`${PROJECT_API_URL}/api/projects/${projectPk}`, options);
    console.log(res);
    return res;
  } catch (err) {
    console.error("프로젝트 삭제 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 삭제 중 오류가 발생했습니다.");
  }
};

export const GetProjectMembers = async (projectPk, keyword, page, size, userToken) => {
  try {
    const res = await axios.get(`${PROJECT_API_URL}/api/projects/${projectPk}/members`, {
      params: {
        keyword,
        page,
        size,
      },
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log("Response:", res);
    console.log("Token:", userToken);
    return res;
  } catch (err) {
    console.error("프로젝트 멤버 조회 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 멤버 조회 중 오류가 발생했습니다.");
  }
};

// export const AddProjectMembers = async (projectPk, userPks, userToken) => {
//   try {
//     const res = await axios.post(`${PROJECT_API_URL}/api/projects/${projectPk}/members`, {
//       userPks,
//     });
//     console.log("Response:", res);
//     return res;
//   } catch (err) {
//     console.error("프로젝트 멤버 추가 중 오류 발생:", err.response ? err.response.data : err.message);
//     throw new Error("프로젝트 멤버 추가 중 오류가 발생했습니다.");
//   }
// };

export const AddProjectMembers = async (projectPk, userPks, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    console.log(projectPk, userPks, userToken);
    const res = await axios.post(
      `${PROJECT_API_URL}/api/projects/${projectPk}/members`,
      {
        userPks: userPks,
      },
      options
    );
    console.log("Response:", res);
    return res;
  } catch (err) {
    console.error("프로젝트 멤버 추가 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 멤버 추가 중 오류가 발생했습니다.");
  }
};

export const RemoveProjectMembers = async (projectPk, userPks, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    const res = await axios.delete(
      `${PROJECT_API_URL}/api/projects/${projectPk}/members`,
      {
        userPks,
      },
      options
    );
    console.log("Response:", res);
    return res;
  } catch (err) {
    console.error("프로젝트 멤버 삭제 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로젝트 멤버 삭제 중 오류가 발생했습니다.");
  }
};
