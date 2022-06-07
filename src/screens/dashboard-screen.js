import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { H2, H1, H3, DashboardCard } from "../infrastructure/commonStyles";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryContainer,
  VictoryLabel,
  VictoryPortal,
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

export const DashboardScreen = () => {
  const { sessions, rerender } = useContext(SessionContext);
  const [timePeriod, setTimePeriod] = useState(30);

  const data = arrayConvert(sessions, "", timePeriod);
  const color = arrayConvert(sessions, "colors", timePeriod);

  const [selectedPieProject, setSelectedPieProject] = useState(null);
  const [selectedPieTime, setSelectedPieTime] = useState(null);

  const handleChangeTimePeriod = () => {
    setSelectedPieProject(null);
    setSelectedPieTime(null);
  };

  const pieDims = width / 2 - scale(30);

  return (
    <SafeView>
      <View>
        <ScrollView stickyHeaderIndices={[1]}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#353535",
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: "space-between",
              overflow: "hidden",
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
                  : timePeriod === 30
                  ? "Monthly"
                  : "All time"}
              </H1>
              <H1>Dashboard</H1>
            </View>
            <Logo project="D" color="#353535" full={false} size={scale(50)} />
          </View>
          <View>
            <View
              style={{
                backgroundColor: "grey",
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 20,
              }}
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
              <TouchableOpacity
                onPress={() => {
                  setTimePeriod(Infinity);
                  handleChangeTimePeriod();
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  All time{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {data.length === 0 ? (
              <Text>No Data for this time period</Text>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <DashboardCard>
                  <H2>Project breakdown</H2>
                  <View
                    style={{ flexDirection: "row", paddingVertical: scale(20) }}
                  >
                    <Svg viewbox={`0 0 ${pieDims} ${pieDims}`}>
                      <VictoryPie
                        width={pieDims}
                        height={pieDims}
                        padding={0}
                        startAngle={360}
                        endAngle={0}
                        labels={() => null}
                        animate={{
                          duration: 1000,
                        }}
                        cornerRadius={scale(4)}
                        events={[
                          {
                            target: "data",
                            eventHandlers: {
                              onPressIn: () => {
                                return [
                                  {
                                    target: "data",
                                    mutation: ({ datum }) => {
                                      setSelectedPieProject(datum.x);
                                      setSelectedPieTime(ConvertTime(datum.y));
                                    },
                                  },
                                ];
                              },
                            },
                          },
                        ]}
                        padAngle={() => scale(2)}
                        innerRadius={scale(50)}
                        data={data}
                        colorScale={color}
                      />
                      <VictoryLabel
                        textAnchor="middle"
                        style={{ fontSize: scale(12), fontWeight: 900 }}
                        x={pieDims / 2}
                        y={pieDims / 2}
                        text={
                          selectedPieProject
                            ? selectedPieProject.length > 12
                              ? selectedPieProject.substr(0, 12) + "..."
                              : selectedPieProject
                            : null
                        }
                      />
                    </Svg>
                  </View>
                  {selectedPieProject ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Logo
                        project={selectedPieProject}
                        color={findColor(selectedPieProject)}
                        full={false}
                        size={scale(40)}
                      />
                      <View style={{ paddingLeft: scale(10) }}>
                        <H3>{selectedPieTime}</H3>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Logo full={false} size={scale(40)} color="black" />
                      <View style={{ paddingLeft: scale(10) }}>
                        <H3>Tap for more </H3>
                        <H3>information</H3>
                      </View>
                    </View>
                  )}
                </DashboardCard>
                <DashboardCard backgroundColor={"#353535"}>
                  <H2 style={{ color: "white" }}>Your time</H2>
                  <PeriodTime calcDays={timePeriod} />
                </DashboardCard>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeView>
  );
};
