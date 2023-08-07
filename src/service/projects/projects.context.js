import React, { useState, createContext, useEffect } from "react";
import { PostCreateProjects, GetProjects, GetProjectDetail } from "./projects.service";

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  return <ProjectsContext.Provider value={{ PostCreateProjects, GetProjects, GetProjectDetail }}>{children}</ProjectsContext.Provider>;
};
