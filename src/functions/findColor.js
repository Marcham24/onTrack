import { projects } from "../services/mock/array";

export const findColor = (project) => {
  const color = projects.find((colorFind) =>
    colorFind.name.includes(project)
  )?.color;
  return color;
};
