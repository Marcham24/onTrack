import { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { SessionContext } from "../services/array.context";
import { ConvertTime } from "../functions/convertTime";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import { H2, H3 } from "../utils/styling";
import { scale } from "../infrastructure/scale";
import { DashboardCard } from "./DashboardCard";

export const PeriodTime = ({ calcDays, isLoading, project }) => {
  const [total, setTotal] = useState(0);
  const [change, setChange] = useState(0);

  const { sessions, rerender } = useContext(SessionContext);

  let now = new Date();
  const day = 1000 * 60 * 60 * 24;

  const period = now.setHours(23, 59, 59, 0) - day * calcDays;
  const prevPeriod = now.setHours(23, 59, 59, 0) - day * calcDays * 2;

  const upVisual = "trending-up-outline";
  const downVisual = "trending-down-outline";

  const up = "chevron-up-circle";
  const down = "chevron-down-circle";

  let projectSpecific;

  project
    ? (projectSpecific = sessions.filter((el) => {
        return el.project === project;
      }))
    : (projectSpecific = sessions);

  const periodFilter = projectSpecific.filter((date) => {
    return date.start > period;
  });

  const prevPeriodTotal = projectSpecific
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

  prevPeriodTotal === total
    ? (incDec = 0)
    : prevPeriodTotal < total
    ? ((incDec = ((prevPeriodTotal - total) / prevPeriodTotal) * 100),
      (symbol = up),
      (color = "#02a60c"),
      (symbolVisual = upVisual))
    : ((incDec = ((total - prevPeriodTotal) / prevPeriodTotal) * 100),
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
  useEffect(() => {
    setTotal(
      periodFilter.reduce(
        (v, currentValue) =>
          (v = v + (currentValue.end.getTime() - currentValue.start.getTime())),
        0
      )
    );
  }, [rerender, calcDays, periodFilter]);

  useEffect(() => {
    setChange(Math.abs(incDec).toFixed());
  }, [incDec, sessions, rerender, calcDays]);

  return (
    <DashboardCard isLoading={isLoading} backgroundColor={!isLoading && color}>
      <View style={{ justifyContent: "space-between" }}>
        <View>
          <View>
            <H2 style={{ color: "white" }}>
              {ConvertTime(total)} over {periodFilter.length} sessions
            </H2>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Ionicons name={symbolVisual} size={scale(160)} color={"white"} />
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
    </DashboardCard>
  );
};
