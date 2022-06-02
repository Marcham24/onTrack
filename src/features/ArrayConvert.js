import { useContext } from "react";
import { Text } from "react-native";
import { projects } from "../services/mock/array";
import { Btn } from "./Btn";

export const arrayConvert = (sessions) => {
  //   get unique project names from projects array,
  //   use periodtime function to calculate total times for that project,
  //   sort list high to low, splice new array to a limited Number,
  //   calculate remaining time for other projects

  const projectNames = projects.map((i) => i.name);

  let projectWithTimes = [];

  const projectTimes = projectNames.map((i) => {
    const projectTime = sessions
      .filter((el) => {
        return el.project === i;
      })
      .reduce(
        (v, currentValue) =>
          (v = v + (currentValue.end.getTime() - currentValue.start.getTime())),
        0
      );
    const entry = {
      x: i,
      y: projectTime,
    };

    projectWithTimes.push(entry);
  });

  const projectWithTimesNoZeros = projectWithTimes
    .filter((x) => {
      return x.y !== 0;
    })
    .sort((a, b) => a.y - b.y);

  return projectWithTimesNoZeros;
};
