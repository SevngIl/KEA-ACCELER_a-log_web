import axios, { AxiosError, AxiosResponse } from "axios";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const USER_API_URL = process.env.REACT_APP_USER_API_URL;

export const UsersLogin = (userEmail: string, userPassword: string): Promise<AxiosResponse> => {
    const loginData = {
        userEmail: userEmail,
        userPw: userPassword,
    };

    const loginResult: Promise<AxiosResponse> = axios
        .post(`${USER_API_URL}/api/users/login`, loginData)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            alert(err);
            throw err; // Re-throw the error to the caller if needed
        });
    return loginResult;
};
