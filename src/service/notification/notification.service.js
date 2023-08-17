import axios from "axios";

const API_URL = process.env.REACT_APP_ALOG_API_URL;

export const GetNotifications = (userToken) => {
  const data = axios.get(API_URL + "/api/noti", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    }
  }).then((res) => {
    console.log(res);
    return res.data.data
  }).catch((err) => {
    console.log(err);
    return null
  });
  return data;
}

export const CheckNotification = (userToken, notiId) => {
  const data = axios.put(API_URL + "/api/noti?id=" + notiId, null, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    }
  }).then((res) => {
    console.log(res);
    return res
  }).catch((err) => {
    console.log(err);
    return null
  });
  return data;
}