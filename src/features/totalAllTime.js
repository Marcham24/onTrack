import { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { SessionContext } from "../services/array.context";
import { ConvertTime } from "./convertTime";

export const TotalAllTime = ({ calcReq }) => {
  const [total, setTotal] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);
  const [change, setChange] = useState(0);
  const [changeColor, setChangeColor] = useState(0);
  const { sessions } = useContext(SessionContext);

  const wk = Date.now() - 1000 * 60 * 60 * 24 * 7;
  const mnth = Date.now() - 1000 * 60 * 60 * 24 * 30;

  const wkPrev = Date.now() - 1000 * 60 * 60 * 24 * 14;
  const mnthPrev = Date.now() - 1000 * 60 * 60 * 24 * 60;

  let period;
  let prevPeriod;

  switch (calcReq) {
    default:
      period = 0;
      prevPeriod = Date.now();
      break;
    case "week":
      period = wk;
      prevPeriod = wkPrev;
      break;
    case "month":
      period = mnth;
      prevPeriod = mnthPrev;
      break;
  }

  const periodTotal = sessions
    .filter((date) => {
      return date.start > period;
    })
    .reduce(
      (v, currentValue) =>
        (v = v + (currentValue.end.getTime() - currentValue.start.getTime())),
      0
    );

  const prevPeriodTotal = sessions
    .filter((date) => {
      return date.start < period && date.start > prevPeriod;
    })
    .reduce(
      (v, currentValue) =>
        (v = v + (currentValue.end.getTime() - currentValue.start.getTime())),
      0
    );

  useEffect(() => {
    setTotal(
      //function to change seconds to readable time format
      ConvertTime(periodTotal)
    );
    setChange(true);
  }, [periodTotal]);

  useEffect(() => {
    setPrevTotal(
      //function to change seconds to readable time format
      ConvertTime(prevPeriodTotal)
    );
    setChange(true);
  }, [prevPeriodTotal]);

  return (
    <View>
      <Text>
        {" "}
        {total} {prevTotal}{" "}
      </Text>
    </View>
  );
};
