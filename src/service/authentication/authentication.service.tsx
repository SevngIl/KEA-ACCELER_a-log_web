import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_ALOG_API_URL;

// EMAIL

export const PostVerifyEmail = (email: string, code: string) => {
    const verifyData = {
        email: email,
        code: code,
    };
    console.log(verifyData);
    const signUpResult: Promise<AxiosResponse> = axios
        .post(`${API_URL}/api/users/permit-all/emails/verify`, verifyData)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
    return signUpResult;
};

export const PostSendVerifyEmail = (email: string) => {
    const emailString = email.replace("@", "%40");
    const sendResult: Promise<AxiosResponse> = axios
        .post(`${API_URL}/api/users/permit-all/emails/send?EmailTo=${emailString}`)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
    return sendResult;
};

// USER AUTH

export const UsersSignup = (email: string, userPw: string, userNN: string) => {
    const SignUpData = {
        userPw: userPw,
        userNN: userNN,
        email: email,
    };
    const signUpResult: Promise<AxiosResponse> = axios
        // .post(`${API_URL}/api/users/signup`, SignUpData)
        .post(`${API_URL}/api/users/permit-all/signup`, SignUpData)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
    return signUpResult;
};

export const UsersLogin = (userEmail: string, userPassword: string): Promise<AxiosResponse> => {
    const loginData = {
        userEmail: userEmail,
        userPw: userPassword,
    };

    const loginResult: Promise<AxiosResponse> = axios
        .post(`${API_URL}/auth/permit-all/login`, loginData)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
    return loginResult;
};

export const UsersInfo = () => {
    return null;
};

export const UsersCheckDuplicate = (userNN: string) => {
    const checkDupResult: Promise<AxiosResponse> = axios
        .get(`${API_URL}/api/users/permit-all/duplicated/${userNN}`)
        .then((res: AxiosResponse) => {
            return res;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
    return checkDupResult;
};

export const UsersDelete = () => {
    return null;
};

export const GetEmailWithGHToken = (accessToken: string) => {
    const res: Promise<AxiosResponse> = axios
        .get(`${API_URL}/auth/permit-all/github/access-token?accessToken=${accessToken}`)
        .then((res: AxiosResponse) => {
            return res.data;
        })
        .catch((err: AxiosError) => {
            throw err;
        });
    return res;
};
export const PermitAllEmailLogin = (email: string) => {
    const params = {
        email: email,
    };
    const res = axios
        .get(`${API_URL}/auth/permit-all/email-login`, { params })
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
    return res;
};
