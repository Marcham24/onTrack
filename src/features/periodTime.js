import { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { SessionContext } from "../services/array.context";
import { ConvertTime } from "./convertTime";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
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

export const PeriodTime = ({ calcDays }) => {
  const [total, setTotal] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);
  const [change, setChange] = useState(0);

  const { sessions } = useContext(SessionContext);

  useEffect(() => {
    setTotal(ConvertTime(periodTotal));
  }, [periodTotal, JSON.stringify(sessions)]);

  useEffect(() => {
    setPrevTotal(ConvertTime(prevPeriodTotal));
  }, [prevPeriodTotal, sessions]);

  useEffect(() => {
    setChange(Math.abs(incDec).toFixed());
  }, [incDec, sessions]);

  const period = Date.now() - 1000 * 60 * 60 * 24 * calcDays;
  const prevPeriod = Date.now() - 1000 * 60 * 60 * 24 * calcDays * 2;

  const upVisual = "trending-up-outline";
  const downVisual = "trending-down-outline";

  const up = "chevron-up-circle";
  const down = "chevron-down-circle";

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

  let incDec;
  let color;
  let symbol;
  let symbolVisual;

  prevPeriodTotal === periodTotal
    ? (incDec = 0)
    : prevPeriodTotal < periodTotal
    ? ((incDec = ((prevPeriodTotal - periodTotal) / prevPeriodTotal) * 100),
      (symbol = up),
      (color = "#66ff6633"),
      (symbolVisual = upVisual))
    : ((incDec = ((periodTotal - prevPeriodTotal) / prevPeriodTotal) * 100),
      (symbol = down),
      (color = "#ff240033"),
      (symbolVisual = downVisual));

  //color: #ffd369;

  const TotalTimeView = styled.View`
    flex-direction: column;
    max-width: 48%;
    padding: 16px 12px;
    margin: 4px;
    background-color: #72768c;
    flex-grow: 1;
    border-radius: 8px;
  `;

  const ChangeView = styled.View`
    flex-direction: row;
    align-items: center;
    align-content: stretch;
  `;

  return (
    <>
      <TotalTimeView>
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "transparent"]}
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 100,
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <H3>Last {calcDays} days: </H3>
            <View>
              <H2>{total} </H2>
            </View>
          </View>
          <View>
            <Ionicons
              name={symbolVisual}
              size={100}
              color={color}
              style={{ position: "absolute", left: -100, zIndex: 0 }}
            />
          </View>
        </View>
        <ChangeView>
          <Ionicons name={symbol} size={20} color="white" />
          <BodyText style={{ color: "white" }}>
            {change
              ? " " + change + "% vs. previous " + calcDays + " days "
              : "No change"}
          </BodyText>
        </ChangeView>
      </TotalTimeView>
    </>
  );
};
