import React, { useState, createContext, useEffect } from "react";
import {
  PostCreateProjects,
  GetProjects,
  GetProjectDetail,
  DeleteProject,
  AddProjectMembers,
  GetProjectMembers,
  RemoveProjectMembers,
} from "./projects.service";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  return (
    <ProjectsContext.Provider
      value={{ PostCreateProjects, GetProjects, GetProjectDetail, DeleteProject, AddProjectMembers, GetProjectMembers, RemoveProjectMembers }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
