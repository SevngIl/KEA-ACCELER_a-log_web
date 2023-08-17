import React, { useState, createContext, useEffect } from "react";
import {
  PostCreateProjects,
  GetMyAllProjects,
  GetProjectDetail,
  DeleteProject,
  AddProjectMembers,
  GetProjectMembers,
  RemoveProjectMembers,
  GetMyTeamProjects,
} from "./projects.service";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  return (
    <ProjectsContext.Provider
      value={{
        PostCreateProjects,
        GetMyAllProjects,
        GetProjectDetail,
        DeleteProject,
        AddProjectMembers,
        GetProjectMembers,
        RemoveProjectMembers,
        GetMyTeamProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
