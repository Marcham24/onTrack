import { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { SessionContext } from "../services/array.context";
import { ConvertTime } from "../functions/convertTime";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import {
  H1,
  H2,
  H3,
  ProjectText,
  CategoryText,
  TimeText,
  TagssText,
  BodyText,
  InputText,
} from "../utils/styling";
import { scale } from "../infrastructure/scale";
import { DashboardCard } from "./DashboardCard";

export const PeriodTime = ({ calcDays }) => {
  const [total, setTotal] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);
  const [change, setChange] = useState(0);

  const { sessions, rerender } = useContext(SessionContext);

  useEffect(() => {
    setTotal(ConvertTime(periodTotal));
  }, [periodTotal, rerender, calcDays]);

  useEffect(() => {
    setPrevTotal(ConvertTime(prevPeriodTotal));
  }, [prevPeriodTotal, sessions, rerender, calcDays]);

  useEffect(() => {
    setChange(Math.abs(incDec).toFixed());
  }, [incDec, sessions, rerender, calcDays]);

  let now = new Date();
  const day = 1000 * 60 * 60 * 24;

  const period = now.setHours(23, 59, 59, 0) - day * calcDays;
  const prevPeriod = now.setHours(23, 59, 59, 0) - day * calcDays * 2;

  const upVisual = "trending-up-outline";
  const downVisual = "trending-down-outline";

  const up = "chevron-up-circle";
  const down = "chevron-down-circle";

  const periodFilter = sessions.filter((date) => {
    return date.start > period;
  });
  const periodTotal = periodFilter.reduce(
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

  let incDec;
  let color;
  let symbol;
  let symbolVisual;

  prevPeriodTotal === periodTotal
    ? (incDec = 0)
    : prevPeriodTotal < periodTotal
    ? ((incDec = ((prevPeriodTotal - periodTotal) / prevPeriodTotal) * 100),
      (symbol = up),
      (color = "#02a60c"),
      (symbolVisual = upVisual))
    : ((incDec = ((periodTotal - prevPeriodTotal) / prevPeriodTotal) * 100),
      (symbol = down),
      (color = "#CA0B00"),
      (symbolVisual = downVisual));

  //color: #ffd369;

  const ChangeView = styled.View`
    flex-direction: row;
    align-self: flex-start;
    flex-grow: 1;
    align-items: flex-end;
  `;

  return (
    <DashboardCard
      backgroundColor={color}
      children={
        <>
          <H2 style={{ color: "white" }}>Your time this period </H2>
          <View style={{ justifyContent: "space-between" }}>
            <View>
              <View>
                <H3 style={{ color: "white", paddingTop: 20 }}>
                  {total} over {periodFilter.length} sessions{" "}
                </H3>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Ionicons name={symbolVisual} size={scale(150)} color={"white"} />
            </View>
          </View>
          <ChangeView>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              {change == Infinity ? (
                <H3 style={{ color: "white" }}>No previous data recorded</H3>
              ) : (
                <>
                  <Ionicons name={symbol} size={scale(20)} color="white" />

                  <H3 style={{ color: "white", paddingLeft: scale(5) }}>
                    {change + "% vs. previous \nperiod"}
                  </H3>
                </>
              )}
            </View>
          </ChangeView>
        </>
      }
    />
  );
};
