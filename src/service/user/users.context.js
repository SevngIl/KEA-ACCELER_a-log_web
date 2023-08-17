import React, { useState, createContext, useEffect } from "react";
import { UploadUserProfileImage, UpdateUserNN, GetUserInfo } from "./users.service";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  return <UsersContext.Provider value={{ UploadUserProfileImage, UpdateUserNN, GetUserInfo }}>{children}</UsersContext.Provider>;
};
