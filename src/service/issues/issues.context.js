import React, { useState, createContext, useEffect } from "react";
import { CreateIssue } from "./issues.service";

export const IssuesContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  return (
    <IssuesContext.Provider
      value={{
        CreateIssue,
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
};
