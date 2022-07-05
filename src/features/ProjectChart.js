import { useContext, useState, useMemo } from "react";
import { scale } from "../infrastructure/scale";
import { H2, H3, V } from "../infrastructure/commonStyles";
import {
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryLabel,
} from "victory-native";
import { SessionContext } from "../services/array.context";
import { findColor } from "../functions/findColor";
import { Dimensions, ActivityIndicator } from "react-native";
const { width } = Dimensions.get("window");
import { projects } from "../services/mock/array";
import { Readable } from "../functions/readableDateTime";
import { ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Logo } from "./Logo";
import { SessionList } from "./SessionList";
import { DashboardCard } from "./DashboardCard";

export const ProjectChart = ({ timePeriod, isLoading }) => {
  const { sessions, rerender } = useContext(SessionContext);
  const getChartData = useMemo(
    () =>
      projects.map((i, v) => {
        let now = new Date();
        let day = 1000 * 60 * 60 * 24;

        let start = now.setHours(23, 59, 59, 0) - day * (timePeriod - 1);
        let end = now.setHours(0, 0, 0, 0) - day * (timePeriod - 1);
        let projectEntry = [];

        const projectFilter = sessions.filter((el) => {
          return el.project === i.name;
        });

        for (let a = 0; a < timePeriod; a++) {
          let dateFilter = [{}];
          dateFilter = projectFilter.filter((date) => {
            return date.start < start && date.start > end;
          });

          let dateTotal = dateFilter.reduce(
            (t, currentValue) =>
              (t =
                t +
                (currentValue.end.getTime() - currentValue.start.getTime())),
            0
          );

          const entry = {
            x: new Date(start),
            y: dateTotal / (60 * 60 * 1000),
            n: i.name,
          };

          projectEntry.push(entry);

          start = start + day;
          end = end + day;
        }
        return (
          <VictoryBar
            name={"bar"}
            style={{
              data: {
                fill: findColor(i.name),
              },
              labels: {
                fontWeight: ({ datum }) =>
                  new Date(datum.x).getDay() === 0 ||
                  new Date(datum.x).getDay() === 6
                    ? 900
                    : 300,
              },
            }}
            barWidth={timePeriod === 1 ? width * 0.6 : scale(35)}
            key={v}
            data={projectEntry}
            labels={({ datum }) => Readable(datum.x, "short")}
            labelComponent={<VictoryLabel y={width + scale(10)} />}
          />
        );
      }),
    [timePeriod, sessions, rerender]
  );

  let chartWidth;
  timePeriod === 30 ? (chartWidth = width * 3) : (chartWidth = width * 0.9);

  const maxDomain = new Date().setHours(23, 59, 59, 0);
  const minDomain =
    new Date().setHours(23, 59, 59, 0) - (timePeriod - 1) * 24 * 60 * 60 * 1000;

  return (
    <DashboardCard isLoading={isLoading}>
      <V row j="sb" ai="c">
        <H2>Time breakdown</H2>
        {timePeriod === 30 && (
          <V row ai="c">
            <H3>Scroll </H3>
            <Ionicons name={"arrow-forward"} size={scale(12)} color="grey" />
          </V>
        )}
      </V>
      <ScrollView
        scrollEnabled={timePeriod === 30 ? true : false}
        horizontal
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <VictoryChart
          maxDomain={{ x: maxDomain }}
          minDomain={{ x: minDomain }}
          height={width}
          width={chartWidth}
          padding={{
            left: scale(40),
            top: scale(20),
            bottom: scale(20),
            right: scale(40),
          }}
        >
          <VictoryStack
            domainPadding={timePeriod === 1 ? scale(5) : scale(30)}
            scale={{ x: "time" }}
          >
            {getChartData}
          </VictoryStack>
          <VictoryAxis
            dependentAxis
            tickFormat={(time) => time + " h"}
            style={{
              grid: { stroke: "black", strokeWidth: 1, opacity: 0.08 },
            }}
          />
          {timePeriod === 30 && (
            <VictoryAxis
              dependentAxis
              tickFormat={(time) => time + " h"}
              orientation={"right"}
            />
          )}
          <VictoryAxis tickFormat={() => ""} />
        </VictoryChart>
      </ScrollView>
    </DashboardCard>
  );
};
