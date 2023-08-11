import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_ALOG_API_URL;

// Teams

export const PostCreateTeams = (teamName: string, userNNList: string[], userPk: number, userToken: string): Promise<AxiosResponse> => {
  const body = {
    teamName: teamName,
    userNNList: userNNList,
  };
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  console.log(teamName, userNNList, userPk, userToken);

  const createTeamRes: Promise<AxiosResponse> = axios
    .post(`${API_URL}/api/users/teams?userPk=${userPk}`, body, options)
    .then((res: AxiosResponse) => {
      console.log(res);
      return res;
    })
    .catch((err: AxiosError) => {
      alert(err.response?.data || err.message);
      throw err;
    });

  return createTeamRes;
};
export const GetTeamInfo = (teamPk: number, userPk: number, userToken: string): Promise<AxiosResponse> => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const res: Promise<AxiosResponse> = axios
    .get(`${API_URL}/api/users/teams?teamPk=${teamPk}&userPk=${userPk}`, options)
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
export const DeleteTeams = (teamPk: number, userPk: number, userToken: string): Promise<AxiosResponse> => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const deleteTeamRes: Promise<AxiosResponse> = axios
    .delete(`${API_URL}/api/users/teams?teamPk=${teamPk}&userPk=${userPk}`, options)
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err: AxiosError) => {
      alert(err);
      throw err;
    });

  return deleteTeamRes;
};
export const GetTeamList = (userPk: number, userToken: string): Promise<AxiosResponse> => {
  console.log(userPk, userToken);
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const getTeamInfoRes: Promise<AxiosResponse> = axios
    .get(`${API_URL}/api/users/teams/list?userPk=${userPk}`, options)
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err: AxiosError) => {
      alert(err);
      throw err;
    });

  return getTeamInfoRes;
};

// Team Members

export const GetTeamMembers = (teamPk: number, userPk: number, userToken: string): Promise<AxiosResponse> => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const getResult: Promise<AxiosResponse> = axios
    .get(`${API_URL}/api/users/team-members?teamPk=${teamPk}&userPk=${userPk}`, options)
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err: AxiosError) => {
      alert(err);
      throw err;
    });

  return getResult;
};

export const PostAddTeamMembers = (teamPk: number, userNNList: string[], userPk: number, userToken: string): Promise<AxiosResponse> => {
  const options = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const body = {
    teamPk: teamPk,
    userNNList: userNNList,
  };
  const postResult: Promise<AxiosResponse> = axios
    .post(`${API_URL}/api/users/team-members?userPk=${userPk}`, body, options)
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err: AxiosError) => {
      alert(err);
      throw err;
    });

  return postResult;
};

export const DeleteTeamMembers = (teamPk: number, userNNList: string[], userPk: number, userToken: string): Promise<AxiosResponse> => {
  const body = {
    teamPk: teamPk,
    userNNList: userNNList,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    data: body,
  };

  const deleteResult: Promise<AxiosResponse> = axios
    .delete(`${API_URL}/api/users/team-members?userPk=${userPk}`, config)
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err: AxiosError) => {
      alert(err);
      throw err;
    });

  return deleteResult;
};
