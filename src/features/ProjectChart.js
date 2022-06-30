import { useContext, useState } from "react";
import { scale } from "../infrastructure/scale";
import { H2, H3, V } from "../infrastructure/commonStyles";
import {
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryChart,
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

  const getChartData = projects.map((i, v) => {
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
          (t = t + (currentValue.end.getTime() - currentValue.start.getTime())),
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
        x="x"
        y="y"
        name={"bar"}
        style={{
          data: {
            fill: findColor(i.name),
          },
        }}
        barWidth={
          timePeriod === 1
            ? width * 0.6
            : timePeriod === 7
            ? scale(30)
            : scale(15)
        }
        key={v}
        data={projectEntry}
      />
    );
  });

  const chartWidth = width * 0.95;
  let chartHeight;
  timePeriod === 30 ? (chartHeight = width * 1.75) : (chartHeight = width);

  return (
    <DashboardCard>
      <H2>Time breakdown</H2>
      <ScrollView
        scrollEnabled={false}
        horizontal
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <VictoryChart
          sortOrder="descending"
          horizontal={timePeriod === 30 ? true : false}
          height={chartHeight}
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
            domainPadding={timePeriod === 1 ? 0 : scale(15)}
            scale={{ x: "time" }}
          >
            {getChartData}
          </VictoryStack>
          <VictoryAxis
            dependentAxis
            tickFormat={(time) => time + " h"}
            style={{
              grid: { stroke: "black", strokeWidth: 1, opacity: 0.04 },
            }}
          />
          <VictoryAxis
            scale={{ x: "time" }}
            tickCount={timePeriod === 30 ? 10 : timePeriod === 7 ? 7 : 1}
            tickFormat={(date) => Readable(date, "short")}
          />
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
