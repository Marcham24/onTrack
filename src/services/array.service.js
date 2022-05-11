import { projects, sessions } from "./mock/array";

export const sessionRequest = () => {
  return new Promise((resolve, reject) => {
    const mockSessions = sessions;
    if (!mockSessions) {
      reject("No project found!");
    }
    resolve(mockSessions);
  });
};

sessionRequest();

export const projectRequest = () => {
  return new Promise((resolve, reject) => {
    const mockProjects = projects;
    if (!mockProjects) {
      reject("No project found!");
    }
    resolve(mockProjects);
  });
};
