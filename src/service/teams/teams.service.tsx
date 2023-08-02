import axios, { AxiosError, AxiosResponse } from "axios";

const USER_API_URL = process.env.REACT_APP_USER_API_URL;

// Teams

export const PostCreateTeams = (teamName: string, userNNList: string[], userPk: number): Promise<AxiosResponse> => {
    const loginData = {
        teamName: teamName,
        userNNList: userNNList,
    };

    const createTeamRes: Promise<AxiosResponse> = axios
        .post(`${USER_API_URL}/api/teams?userPk=${userPk}`, loginData)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            alert(err);
            throw err;
        });

    return createTeamRes;
};
export const DeleteTeams = (teamName: string, userPk: number): Promise<AxiosResponse> => {
    const deleteTeamRes: Promise<AxiosResponse> = axios
        .delete(`${USER_API_URL}/api/teams?teamName=${teamName}&userPk=${userPk}`)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            alert(err);
            throw err;
        });

    return deleteTeamRes;
};
export const GetInfoTeams = (teamName: string, userPk: number): Promise<AxiosResponse> => {
    const getTeamInfoRes: Promise<AxiosResponse> = axios
        .get(`${USER_API_URL}/api/teams?teamName=${teamName}&userPk=${userPk}`)
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

export const GetTeamMembers = (teamName: string, userPk: number): Promise<AxiosResponse> => {
    const getResult: Promise<AxiosResponse> = axios
        .get(`${USER_API_URL}/api/team-members?teamName=${teamName}&userPk=${userPk}`)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            alert(err);
            throw err;
        });

    return getResult;
};

export const PostTeamMembers = (teamName: string, userNNList: string[], userPk: number): Promise<AxiosResponse> => {
    const body = {
        teamName: teamName,
        userNNList: userNNList,
    };
    const postResult: Promise<AxiosResponse> = axios
        .post(`${USER_API_URL}/api/team-members?userPk=${userPk}`, body)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            alert(err);
            throw err;
        });

    return postResult;
};

export const DeleteTeamMembers = (teamName: string, userNNList: string[], userPk: number): Promise<AxiosResponse> => {
    const body = {
        teamName: teamName,
        userNNList: userNNList,
    };
    const deleteResult: Promise<AxiosResponse> = axios
        .delete(`${USER_API_URL}/api/team-members?userPk=${userPk}`, { data: body })
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            alert(err);
            throw err;
        });

    return deleteResult;
};
