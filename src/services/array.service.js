import { projects, sessions } from "./mock/array";

export const sessionRequest = (project = "GermErase") => {
  return new Promise((resolve, reject) => {
    const mockSessions = sessions[project];
    if (!mockSessions) {
      reject("No project found!");
    }
    resolve(mockSessions);
  });
};

sessionRequest();

export const projectRequest = (project = "GermErase") => {
  return new Promise((resolve, reject) => {
    const mockProjects = projects[project];
    if (!mockProjects) {
      reject("No project found!");
    }
    resolve(mockProjects);
  });
};
