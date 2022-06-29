import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { H2, H1, H3, V, TimePeriod } from "../infrastructure/commonStyles";
import {
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";
import { ConvertTime } from "../features/convertTime";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Logo } from "../features/logo";
import { arrayConvert } from "../features/ArrayConvert";
import { SessionContext } from "../services/array.context";
import { findColor } from "../functions/findColor";
import { Svg } from "react-native-svg";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { ProjectPie } from "../features/ProjectPie";
import { projects } from "../services/mock/array";
import { Readable } from "../features/ReadableDateTime";
import { ViewProjects } from "../features/ProjectsList";
import { DashboardCard } from "../features/DashboardCard";
import { DashboardHeader } from "../features/DashboardHeader";
import { Toast } from "../features/Toast";
import { ProjectChart } from "../features/ProjectChart";

export const DashboardScreen = () => {
  const { sessions, rerender } = useContext(SessionContext);
  const [timePeriod, setTimePeriod] = useState(30);
  const [changeColor, setChangeColor] = useState("#8B0000");

  const handleChangeTimePeriod = (time) => {
    setTimePeriod(time);
  };

  const getChartData = projects.map((i, v) => {
    let now = new Date();
    let day = 1000 * 60 * 60 * 24;

    let start = now.setHours(23, 59, 59, 999) - day * (timePeriod - 1);
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
        style={{
          data: {
            fill: findColor(i.name) + "B3",
          },
        }}
        barWidth={scale((1 / timePeriod) * 250)}
        key={v}
        data={projectEntry}
      />
    );
  });

  const [scrollY] = useState(new Animated.Value(0));

  return (
    <>
      <V row pt={4} pb={4} bg={"c1"} j={"sa"} ai={"c"} shadow>
        <TouchableOpacity
          onPress={() => {
            handleChangeTimePeriod(1);
          }}
        >
          <TimePeriod>Today</TimePeriod>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleChangeTimePeriod(7);
          }}
        >
          <TimePeriod>7 days</TimePeriod>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleChangeTimePeriod(30);
          }}
        >
          <TimePeriod>30 days</TimePeriod>
        </TouchableOpacity>
      </V>

      <ScrollView
        nestedScrollEnabled={true}
        bounces={false}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        overScrollMode={"never"}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            listener: (event) => {},
            useNativeDriver: false,
          }
        )}
      >
        <DashboardHeader animatedValue={scrollY} />

        <V p={1} z={5}>
          <V row>
            <ProjectPie timePeriod={timePeriod} />
            <PeriodTime calcDays={timePeriod} />
          </V>
          <>
            <DashboardCard>
              <ProjectChart timePeriod={timePeriod} />
            </DashboardCard>
            <DashboardCard>
              <ViewProjects />
            </DashboardCard>
          </>
        </V>
      </ScrollView>
    </>
  );
};
