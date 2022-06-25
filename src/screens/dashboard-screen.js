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
import { H2, H1, H3, SView, TimePeriod } from "../infrastructure/commonStyles";
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

export const DashboardScreen = () => {
  const { sessions, rerender } = useContext(SessionContext);
  const [timePeriod, setTimePeriod] = useState(3);
  const [changeColor, setChangeColor] = useState("#8B0000");

  const data = arrayConvert(sessions, "", timePeriod);
  const color = arrayConvert(sessions, "colors", timePeriod);

  const [selectedPieProject, setSelectedPieProject] = useState(null);
  const [selectedPieTime, setSelectedPieTime] = useState(null);

  const handleChangeTimePeriod = () => {
    setSelectedPieProject(null);
    setSelectedPieTime(null);
  };

  const chartDims = width - scale(40);

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
      <SView row pt={4} pb={4} bg={"c1"} justify={"sa"} align={"c"} shadow>
        <TouchableOpacity
          onPress={() => {
            setTimePeriod(1);
            handleChangeTimePeriod();
          }}
        >
          <TimePeriod>Today</TimePeriod>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTimePeriod(7);
            handleChangeTimePeriod();
          }}
        >
          <TimePeriod>7 days</TimePeriod>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTimePeriod(30);
            handleChangeTimePeriod();
          }}
        >
          <TimePeriod>30 days</TimePeriod>
        </TouchableOpacity>
      </SView>

      <ScrollView
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
        <DashboardHeader animatedValue={scrollY} project="aberrant" />

        <SView p={1} z={5}>
          <SView row>
            <ProjectPie timePeriod={timePeriod} />
            <PeriodTime calcDays={timePeriod} />
          </SView>
          <SView>
            <DashboardCard>
              <H2>Time breakdown</H2>
              <VictoryStack
                // events={[
                //   {
                //     target: "data",
                //     eventHandlers: {
                //       // no-op the default tooltip onMouseOver and onMouseOut event handlers
                //       onMouseOver: () => {},
                //       onMouseOut: () => {},
                //       // add an onClick handler
                //       onPressIn: () => {
                //         return [
                //           {
                //             // this mutation sets `active: false` on all labels
                //             eventKey: "all",
                //             target: "labels",
                //             mutation: () => ({ active: false }),
                //           },
                //           {
                //             // next, the second mutation sets `active: true` on just the slice you clicked
                //             // the eventKey is set to the element that originated the event if non is given
                //             target: "labels",
                //             mutation: () => ({ active: true }),
                //           },
                //         ];
                //       },
                //     },
                //   },
                // ]}
                // containerComponent={
                //   <VictoryVoronoiContainer
                //     labelComponent={
                //       <VictoryTooltip
                //         width={2000}
                //         cornerRadius={0}
                //         flyoutStyle={{ fill: "white" }}
                //       />
                //     }
                //     voronoiDimension="x"
                //     labels={({ datum }) => `y: ${datum.y}`}
                //   />
                // }
                domainPadding={
                  timePeriod === 1 ? 0 : timePeriod === 7 ? scale(25) : scale(8)
                }
                padding={scale(30)}
                width={chartDims}
                height={chartDims / 1.5}
                scale={{ x: "time" }}
              >
                {getChartData}
                <VictoryAxis
                  tickCount={4}
                  tickFormat={(date) => Readable(date - 1, "short")}
                />
                <VictoryAxis dependentAxis />
              </VictoryStack>
            </DashboardCard>
            <DashboardCard backgroundColor={"#353535"}>
              <ViewProjects />
            </DashboardCard>
          </SView>
        </SView>
      </ScrollView>
    </>
  );
};
