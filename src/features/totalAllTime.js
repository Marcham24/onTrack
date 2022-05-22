import { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { SessionContext } from "../services/array.context";
import { H2 } from "../utils/styling";
import { ConvertTime } from "./convertTime";
import { TimeToDays } from "./timeToDays";

export const TotalAllTime = ({ project, projectSpecific = false }) => {
  const [total, setTotal] = useState(0);
  const { sessions, rerender } = useContext(SessionContext);
  let sessionsArray = sessions;
  projectSpecific &&
    (sessionsArray = sessions.filter((v) => {
      return v.project.includes(project);
    }));
  const periodTotal = sessionsArray.reduce(
    (v, currentValue) => (v = v + (currentValue.end - currentValue.start)),
    0
  );
  useEffect(() => {
    setTotal(
      //function to change seconds to readable time format
      ConvertTime(periodTotal)
    );
  }, [periodTotal, rerender]);
  return <Text>{total}</Text>;
};
