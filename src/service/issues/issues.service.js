import axios from "axios";

const API_URL = process.env.REACT_APP_ALOG_API_URL;

export const PostCreateIssue = async (imgs, issue, userToken) => {
  const formatDateTime = (date) => {
    return date.toISOString().slice(0, 19);
  };

  const issueWithFormattedDates = {
    ...issue,
    startDate: formatDateTime(new Date(issue.startDate)),
    endDate: formatDateTime(new Date(issue.endDate)),
  };

  const formData = new FormData();
  formData.append("imgs", imgs); // imgs는 파일 객체
  formData.append("issue", JSON.stringify(issueWithFormattedDates));

  formData.forEach((value, key) => {
    console.log(`formData ${key}: `, value);
  });

  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.post(`${API_URL}/api/aggr/issue`, formData, options);
    console.log("issue formData: ", formData);
    return res;
  } catch (err) {
    console.error("이슈 생성 중 오류 발생:", err.response ? err.response.data : err.message);
    console.log("issue formData: ", formData);
    throw new Error("이슈 생성 중 오류가 발생했습니다.");
  }
};

// export const GetOneIssue = async (issuePk) => {
//   try {
//     const res = await axios.get(`${API_URL}/api/issue`, {
//       params: {
//         issuePk: issuePk,
//       },
//     });

//     if (res.data.isSuccess) {
//       return res.data.data;
//     } else {
//       console.error("이슈 받아오기 오류:", res.data.message);
//       throw new Error("이슈를 받아올 수 없습니다.");
//     }
//   } catch (err) {
//     console.error("이슈 받아오기 중 오류 발생:", err.response ? err.response.data : err.message);
//     throw new Error("이슈 받아오기 중 오류가 발생했습니다.");
//   }
// };

export const GetOneIssue = async (issuePk, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const res = await axios.get(`${API_URL}/api/issue?issuePk=${issuePk}`, options);
    if (res.data.isSuccess) {
      console.log("Get one Issue:", res.data.data);
      return res.data.data;
    } else {
      console.error("이슈 받아오기 오류:", res.data.message);
      throw new Error("이슈를 받아올 수 없습니다.");
    }
  } catch (err) {
    console.error("이슈 받아오기 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("이슈 받아오기 중 오류가 발생했습니다.");
  }
};

export const GetAllIssues = async (pkPk, page, size, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const res = await axios.get(`${API_URL}/api/issue/all?pkPk=${pkPk}&page=${page}&size=${size}`, options);

    console.log("Issue Response:", res);
    return res;
  } catch (err) {
    console.error("이슈 전체 받아오기 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("이슈 전체 받아오기 중 오류가 발생했습니다.");
  }
};

export const updateIssueStatus = async (issuePk, issueStatus, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const response = await axios.patch(`${API_URL}/api/issue/status?issuePk=${issuePk}&issueStatus=${issueStatus}`, options);
    return response;
  } catch (error) {
    console.error("이슈 상태 업데이트 중 오류 발생:", error);
    throw error;
  }
};
