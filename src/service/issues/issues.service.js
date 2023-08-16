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

export const GetOneIssue = async (issuePk, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const res = await axios.get(`${API_URL}/api/issue?issuePk=${issuePk}`, options);

    console.log("Get one Issue:", res.data);
    return res.data;
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

export const UpdateIssueStatus = async (issuePk, issueStatus, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    console.log("issuePk, status, token in api:", issuePk, issueStatus, userToken);
    const response = await axios.patch(`${API_URL}/api/issue/status?issuePk=${issuePk}&issueStatus=${issueStatus}`, {}, options);

    return response;
  } catch (error) {
    console.error("이슈 상태 업데이트 중 오류 발생:", error);
    throw error;
  }
};

export const UpdateIssueImage = async (issuePk, imgs, userToken) => {
  const formData = new FormData();
  formData.append("issuePk", issuePk.toString());
  formData.append("imgs", imgs);

  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    console.log("issuePk in api:", issuePk);
    console.log("imgs in api:", imgs);
    console.log("token in api:", userToken);
    const response = await axios.post(`${API_URL}/api/aggr/issue/image`, formData, options);

    return response;
  } catch (error) {
    console.error("이슈 이미지 업데이트 중 오류 발생:", error);
    throw error;
  }
};

export const UpdateIssueDate = async (issuePk, startDate, endDate, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19);
  };

  const formattedStartDate = formatDateTime(startDate);
  const formattedEndDate = formatDateTime(endDate);

  try {
    console.log("issuePk in api:", issuePk);
    console.log("startDate in api:", formattedStartDate);
    console.log("endDate in api:", formattedEndDate);
    console.log("token in api:", userToken);

    const response = await axios.patch(`${API_URL}/api/issue/date?issuePk=${issuePk}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`, [], options);

    return response;
  } catch (err) {
    console.error("이슈 받아오기 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("이슈 받아오기 중 오류가 발생했습니다.");
  }
};
