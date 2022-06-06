import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { H2, H1, H3 } from "../infrastructure/commonStyles";
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

export const DashboardScreen = () => {
  const { sessions, rerender } = useContext(SessionContext);
  const [timePeriod, setTimePeriod] = useState(1);

  const data = arrayConvert(sessions, "", timePeriod);
  const color = arrayConvert(sessions, "colors", timePeriod);

  const [selectedPieProject, setSelectedPieProject] = useState(null);
  const [selectedPieTime, setSelectedPieTime] = useState(null);

  const handleChangeTimePeriod = () => {
    setSelectedPieProject(null);
    setSelectedPieTime(null);
  };

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
                color: "white",
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
                <Text>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimePeriod(7);
                  handleChangeTimePeriod();
                }}
              >
                <Text>7 days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimePeriod(30);
                  handleChangeTimePeriod();
                }}
              >
                <Text>30 days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimePeriod(Infinity);
                  handleChangeTimePeriod();
                }}
              >
                <Text>All time </Text>
              </TouchableOpacity>
            </View>
          </View>
          <PeriodTime calcDays={timePeriod} />

          {data.length === 0 ? (
            <Text>No Data for this time period</Text>
          ) : (
            <View
              style={{
                backgroundColor: "white",
                margin: scale(8),
                borderRadius: 10,
                padding: scale(15),
              }}
            >
              <H2>Top project's breakdown</H2>
              <VictoryPie
                startAngle={360}
                endAngle={0}
                labels={() => null}
                animate={{
                  duration: 1000,
                }}
                padding={{ top: 0, button: 0, right: scale(44), left: 0 }}
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
                    size={scale(60)}
                  />
                  <View style={{ paddingLeft: 20 }}>
                    <H3>{selectedPieProject}</H3>
                    <H3 style={{ color: "grey" }}>{selectedPieTime}</H3>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Logo full={false} size={scale(60)} color="black" />
                  <View style={{ paddingLeft: 20 }}>
                    <H3>Tap the chart for </H3>
                    <H3>project information</H3>
                  </View>
                </View>
              )}
              <View>
                <PeriodTime calcDays={timePeriod} />
                <PeriodTime calcDays={timePeriod} />
                <PeriodTime calcDays={timePeriod} />
                <PeriodTime calcDays={timePeriod} />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeView>
  );
};
