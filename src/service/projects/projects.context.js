import React, { useState, createContext, useEffect } from "react";
import { PostCreateProjects, GetProjects, GetProjectDetail, DeleteProject, AddProjectMembers, GetProjectMembers } from "./projects.service";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  return (
    <ProjectsContext.Provider value={{ PostCreateProjects, GetProjects, GetProjectDetail, DeleteProject, AddProjectMembers, GetProjectMembers }}>
      {children}
    </ProjectsContext.Provider>
  );
};
