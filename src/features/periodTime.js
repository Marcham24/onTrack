import { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { SessionContext } from "../services/array.context";
import { ConvertTime } from "./convertTime";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

export const PeriodTime = ({ calcDays }) => {
  const [total, setTotal] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);
  const [change, setChange] = useState(0);
  const [symbol, setSymbol] = useState(null);
  const { sessions } = useContext(SessionContext);

  useEffect(() => {
    setTotal(ConvertTime(periodTotal));
  }, [periodTotal, sessions]);

  useEffect(() => {
    setPrevTotal(ConvertTime(prevPeriodTotal));
  }, [prevPeriodTotal, sessions]);

  useEffect(() => {
    setChange(Math.abs(incDec).toFixed());
  }, [incDec, sessions]);

  useEffect(() => {
    setSymbol(changeSymbol);
  }, [changeSymbol, sessions]);

  const period = Date.now() - 1000 * 60 * 60 * 24 * calcDays;
  const prevPeriod = Date.now() - 1000 * 60 * 60 * 24 * calcDays * 2;

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
  let changeSymbol;

  prevPeriodTotal === periodTotal
    ? (incDec = 0)
    : prevPeriodTotal < periodTotal
    ? ((incDec = ((prevPeriodTotal - periodTotal) / prevPeriodTotal) * 100),
      (changeSymbol = up))
    : ((incDec = ((periodTotal - prevPeriodTotal) / prevPeriodTotal) * 100),
      (changeSymbol = down));

  const H2 = styled.Text`
    font-size: 30px;
    color: #ffd369;
    padding: 0px 0px 10px 0px;
  `;

  const TotalTimeView = styled.View`
    flex-direction: column;
    max-width: 50%;
    padding: 20px;
    margin: 8px;
    background-color: #393e46;
    flex-grow: 1;
    border-radius: 12px;
  `;

  const ChangeView = styled.View`
    flex-direction: row;
    align-items: center;
    align-content: stretch;
  `;

  const H3 = styled.Text`
    font-size: 18px;
    color: #eeeeee;
  `;

  return (
    <>
      <TotalTimeView>
        <H3>Last {calcDays} days:</H3>
        <View>
          <H2>{total}</H2>
        </View>
        <ChangeView>
          <Ionicons name={symbol} size={25} color={"white"} />
          <Text style={{ color: "white" }}>
            {change
              ? change + "% vs. previous " + calcDays + " days "
              : "No change"}
          </Text>
        </ChangeView>
      </TotalTimeView>
    </>
  );
};
