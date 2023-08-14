import axios from "axios";

const API_URL = process.env.REACT_APP_ALOG_API_URL;

export const CreateIssue = async (
  pjPk,
  teamPk,
  issueTitle,
  issueDescription,
  issueAuthorPk,
  issueStatus,
  issueLabel,
  todoPk,
  issueOpened,
  issueAssigneePk,
  fileLink,
  issueId
) => {
  const issueData = {
    pjPk: pjPk,
    teamPk: teamPk,
    issueTitle: issueTitle,
    issueDescription: issueDescription,
    issueAuthorPk: issueAuthorPk,
    issueStatus: issueStatus,
    issueLabel: issueLabel,
    todoPk: todoPk,
    issueOpened: issueOpened,
    issueAssigneePk: issueAssigneePk,
    fileLink: fileLink,
    issueId: issueId,
  };

  console.log("Request body for issue creation:", issueData);

  try {
    const res = await axios.post(`${API_URL}/api/issue/create`, issueData);
    console.log("Response for issue creation:", res);
    return res;
  } catch (err) {
    console.error("Issue 생성 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("Issue 생성 중 오류가 발생했습니다.");
  }
};

export const GetIssue = async (issuePk, pjPk, teamPk) => {
  const url = `${API_URL}/api/issue/get?issuePk=${issuePk}&pjPk=${pjPk}&teamPk=${teamPk}`;

  try {
    // GET 요청을 보냅니다.
    const res = await axios.get(url);
    console.log("Issue:", res);
    return res;
  } catch (err) {
    console.error("이슈 조회 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("이슈 조회 중 오류가 발생했습니다.");
  }
};
