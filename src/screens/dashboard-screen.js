import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { H2, H1, H3 } from "../infrastructure/commonStyles";
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

  return (
    <SafeView>
      <View>
        <ScrollView stickyHeaderIndices={[1]}>
          <View
            style={{
              flex: 2,
              flexGrow: 1,
              backgroundColor: "#353535",
              paddingHorizontal: scale(20),
              paddingVertical: scale(150),
              justifyContent: "space-between",

              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <H1>
                {timePeriod === 1
                  ? "Today's"
                  : timePeriod === 7
                  ? "Weekly"
                  : "Monthly"}
              </H1>
              <H1>Dashboard</H1>
            </View>
            <Logo project="D" color="#000000" full={false} size={scale(75)} />
          </View>

          <View
            style={{
              backgroundColor: "black",

              padding: 20,
              zIndex: 200,
              elevation: 30,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => {
                  setTimePeriod(1);
                  handleChangeTimePeriod();
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimePeriod(7);
                  handleChangeTimePeriod();
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  7 days
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimePeriod(30);
                  handleChangeTimePeriod();
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  30 days
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ padding: 5 }}>
            <View>
              {data.length === 0 ? (
                <Text>No Data for this time period</Text>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                  <DashboardCard
                    children={<ProjectPie timePeriod={timePeriod} />}
                  />

                  <PeriodTime calcDays={timePeriod} />
                </View>
              )}
            </View>
            <View>
              {data.length === 0 ? (
                <Text>No Data for this time period</Text>
              ) : (
                <View style={{ alignItems: "stretch" }}>
                  <DashboardCard>
                    <H2>Time breakdown</H2>
                    <VictoryStack
                      events={[
                        {
                          target: "data",
                          eventHandlers: {
                            // no-op the default tooltip onMouseOver and onMouseOut event handlers
                            onMouseOver: () => {},
                            onMouseOut: () => {},
                            // add an onClick handler
                            onPressIn: () => {
                              return [
                                {
                                  // this mutation sets `active: false` on all labels
                                  eventKey: "all",
                                  target: "labels",
                                  mutation: () => ({ active: false }),
                                },
                                {
                                  // next, the second mutation sets `active: true` on just the slice you clicked
                                  // the eventKey is set to the element that originated the event if non is given
                                  target: "labels",
                                  mutation: () => ({ active: true }),
                                },
                              ];
                            },
                          },
                        },
                      ]}
                      containerComponent={
                        <VictoryVoronoiContainer
                          labelComponent={
                            <VictoryTooltip
                              width={2000}
                              cornerRadius={0}
                              flyoutStyle={{ fill: "white" }}
                            />
                          }
                          voronoiDimension="x"
                          labels={({ datum }) => `y: ${datum.y}`}
                        />
                      }
                      domainPadding={
                        timePeriod === 1
                          ? 0
                          : timePeriod === 7
                          ? scale(25)
                          : scale(8)
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
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeView>
  );
};
