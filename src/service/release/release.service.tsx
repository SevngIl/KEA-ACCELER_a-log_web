import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_ALOG_API_URL;

export const GetReleaseNote = (notePk: number, userToken: string): Promise<AxiosResponse> => {
  const res: Promise<AxiosResponse> = axios
    .get(`${API_URL}/api/release/note/${notePk}`,
      {
        headers: {
          'Authorization': 'Bearer ' + userToken,
        }
      })
    .then((res: AxiosResponse) => {
      console.log(res);
      return res;
    })
    .catch((err: AxiosError) => {
      alert(err.response?.data || err.message);
      throw err;
    });

  return res;
};

export const PostReleaseNote = (pjPk: number, teamPk: number, ischkData: boolean, userToken: string): Promise<AxiosResponse> => {
  const body = {
    pjPk: pjPk,
    teamPk: teamPk,
    noteTitle: "dummy",
    noteContent: "dummy",
    noteVersion: "dummy",
    ischkData: ischkData,
  };
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const createReleaseNoteRes: Promise<AxiosResponse> = axios
    .post(`${API_URL}/api/release/note/create`, body, options)
    .then((res: AxiosResponse) => {
      console.log(res);
      return res;
    })
    .catch((err: AxiosError) => {
      alert(err.response?.data || err.message);
      throw err;
    });

  return createReleaseNoteRes;
}

export const GetReleaseNoteList = (pjPk: number, teamPk: number, userToken: string): Promise<AxiosResponse> => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const res: Promise<AxiosResponse> = axios
    .get(`${API_URL}/api/release/note/list/${pjPk}/1/10`, options)
    .then((res: AxiosResponse) => {
      console.log(res);
      return res;
    })
    .catch((err: AxiosError) => {
      alert(err.response?.data || err.message);
      throw err;
    });

  return res;
}