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

export const ProjectChart = ({ timePeriod }) => {
  const { sessions, rerender } = useContext(SessionContext);
  const [dateEnd, setDateEnd] = useState();
  const [dateStart, setDateStart] = useState();

  const handleSelectedDate = (selectedDate) => {
    setDateStart(selectedDate.setHours(23, 59, 59, 0));
    const newDate = new Date(selectedDate).setHours(0, 0, 0, 0);

    setDateEnd(new Date(newDate).toISOString());
  };

  const selectedDateFilter = sessions.filter((date) => {
    return date.start < new Date(dateStart) && date.start > new Date(dateEnd);
  });

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
            }}
            barWidth={timePeriod === 1 ? width * 0.6 : scale(35)}
            key={v}
            data={projectEntry}
            labels={({ datum }) => Readable(datum.x, "short")}
            labelComponent={<VictoryLabel y={width - scale(10)} />}
          />
        );
      }),
    [timePeriod, sessions]
  );

  let chartWidth;
  timePeriod === 30 ? (chartWidth = width * 3) : (chartWidth = width * 0.9);

  const maxDomain = new Date().setHours(23, 59, 59, 0);
  const minDomain =
    new Date().setHours(23, 59, 59, 0) - (timePeriod - 1) * 24 * 60 * 60 * 1000;

  return (
    <DashboardCard rerender={timePeriod}>
      <H2>Time breakdown</H2>
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
          sortOrder="descending"
          height={width}
          width={chartWidth}
          padding={scale(50)}
          events={[
            {
              childName: "bar",
              target: "data",
              eventHandlers: {
                onPressIn: (event, data) => {
                  handleSelectedDate(data.datum.x);
                },
              },
            },
          ]}
          containerComponent={<VictoryVoronoiContainer voronoiDimension="x" />}
        >
          <VictoryStack
            domainPadding={timePeriod === 1 ? 0 : scale(20)}
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
          <VictoryAxis tickFormat={() => ""} />
        </VictoryChart>
      </ScrollView>
      {dateEnd ? (
        <>
          <V pb={3}>
            <H2>{Readable(dateStart, "date")} sessions</H2>
          </V>
          <SessionList data={selectedDateFilter} horizontal inverse />
        </>
      ) : (
        <V row ai="c">
          <Logo
            project={"i"}
            color={"#000000"}
            full={false}
            size={scale(40)}
            sessions={sessions}
          />
          <V pl={2}>
            <H3>Tap for more information</H3>
          </V>
        </V>
      )}
    </DashboardCard>
  );
};
