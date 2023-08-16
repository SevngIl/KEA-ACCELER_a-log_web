import React, { useState, createContext, useEffect } from "react";
import { PostCreateIssue, GetOneIssue, UpdateIssueStatus, GetAllIssues, UpdateIssueImage, UpdateIssueDate } from "./issues.service";

export const IssuesContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  return (
    <IssuesContext.Provider
      value={{
        PostCreateIssue,
        GetOneIssue,
        UpdateIssueStatus,
        GetAllIssues,
        UpdateIssueImage,
        UpdateIssueDate,
      }}
    >
      {children}
    </IssuesContext.Provider>
  );
};
