import { useContext } from "react";
import { Text } from "react-native";
import { findColor } from "../functions/findColor";
import { projects } from "../services/mock/array";

export const arrayConvert = (sessions, type, period = 7) => {
  //   get unique project names from projects array,
  //   use periodtime function to calculate total times for that project,
  //   sort list high to low, splice new array to a limited Number,
  //   calculate remaining time for other projects

  const projectNames = projects.map((i) => i.name);

  let projectWithTimes = [];

  const periodTime = Date.now() - 1000 * 60 * 60 * 24 * period;

  const projectTimes = projectNames.map((i) => {
    const projectTime = sessions
      .filter((el) => {
        return el.project === i;
      })
      .filter((date) => {
        return date.start > periodTime;
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
    .sort((a, b) => b.y - a.y);

  let projectColorsArray = [];

  const projectColors = projectWithTimesNoZeros.map((i, v) => {
    const color = findColor(i.x);

    projectColorsArray.push(color);
  });

  return type === "colors" ? projectColorsArray : projectWithTimesNoZeros;
};
