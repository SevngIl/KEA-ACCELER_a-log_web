import axios from "axios";

const API_URL = process.env.REACT_APP_ALOG_API_URL;

export const UploadUserProfileImage = async (userPk, imgs, userToken) => {
  const formData = new FormData();

  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  formData.append("userPk", userPk.toString()); // int를 문자열로 변환하여 추가
  formData.append("imgs", imgs);

  try {
    const response = await axios.post(`${API_URL}/api/aggr/users/profile/image`, formData, options);
    console.log("profile img:", response);
    return response;
  } catch (err) {
    console.error("프로필 이미지 업로드 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로필 이미지 업로드 중 오류가 발생했습니다.");
  }
};

export const UpdateUserNN = async (userPk, userNN, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const res = await axios.patch(`${API_URL}/api/users/nn?userPk=${userPk}&userNn=${userNN}`, [], options);
    console.log("update NN: ", res);
    return res;
  } catch (err) {
    console.error("프로필 닉네임 변경 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("프로필 닉네임 변경 중 오류가 발생했습니다.");
  }
};

export const GetUserInfo = async (userPk, userToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    const res = await axios.get(`${API_URL}/api/users/info/${userPk}`, options);
    console.log("update NN: ", res);
    return res;
  } catch (err) {
    console.error("유저 정보를 받아 오는 중 오류 발생:", err.response ? err.response.data : err.message);
    throw new Error("유저 정보를 받아 오는 중 오류가 발생했습니다.");
  }
};
