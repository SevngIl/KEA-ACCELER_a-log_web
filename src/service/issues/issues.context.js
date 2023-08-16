import React, { useState, createContext, useEffect } from "react";
import { PostCreateIssue, GetOneIssue } from "./issues.service";

export const IssuesContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  return (
    <IssuesContext.Provider
      value={{
        PostCreateIssue,
        GetOneIssue,
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
};
