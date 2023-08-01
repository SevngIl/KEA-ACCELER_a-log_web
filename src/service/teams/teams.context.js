import React, { useState, createContext, useEffect } from "react";
import {} from "./teams.service";

export const TeamsContext = createContext();

export const TeamsContextProvider = ({ children }) => {
    return <TeamsContext.Provider value={{}}>{children}</TeamsContext.Provider>;
};
