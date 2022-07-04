import { useContext } from "react";
import { SessionContext } from "../services/array.context";
import { ConvertTime } from "./convertTime";

export const TotalAllTime = (project, projectSpecific) => {
  const { sessions } = useContext(SessionContext);
  let sessionsArray = sessions;

  projectSpecific &&
    (sessionsArray = sessions.filter((v) => {
      return v.project.includes(project);
    }));

  const periodTotal = sessionsArray.reduce(
    (v, currentValue) => (v = v + (currentValue.end - currentValue.start)),
    0
  );

  const total = ConvertTime(periodTotal);

  return total;
};
