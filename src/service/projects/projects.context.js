import React, { useState, createContext, useEffect } from "react";
import {
  PostCreateProjects,
  GetAllProjects,
  GetProjectDetail,
  DeleteProject,
  AddProjectMembers,
  GetProjectMembers,
  RemoveProjectMembers,
  GetMyProjects,
} from "./projects.service";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  return (
    <ProjectsContext.Provider
      value={{ PostCreateProjects, GetAllProjects, GetProjectDetail, DeleteProject, AddProjectMembers, GetProjectMembers, RemoveProjectMembers, GetMyProjects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
