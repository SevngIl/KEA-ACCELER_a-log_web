import React, { useState, createContext, useEffect } from "react";
import { UploadUserProfileImage, UpdateUserNN } from "./users.service";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  return <UsersContext.Provider value={{ UploadUserProfileImage, UpdateUserNN }}>{children}</UsersContext.Provider>;
};
