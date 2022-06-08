import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { H2, H1, H3, DashboardCard } from "../infrastructure/commonStyles";
import {
  VictoryZoomContainer,
  VictoryStack,
  VictoryArea,
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

export const DashboardScreen = () => {
  const { sessions, rerender } = useContext(SessionContext);
  const [timePeriod, setTimePeriod] = useState(3);

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
                  : "Monthly"}
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
            </View>
          </View>
          <View>
            {data.length === 0 ? (
              <Text>No Data for this time period</Text>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <DashboardCard>
                  <ProjectPie timePeriod={timePeriod} />
                </DashboardCard>
                <DashboardCard backgroundColor={"#353535"}>
                  <H2 style={{ color: "white" }}>Your time this period </H2>
                  <PeriodTime calcDays={timePeriod} />
                </DashboardCard>
              </View>
            )}
          </View>
          <View>
            {data.length === 0 ? (
              <Text>No Data for this time period</Text>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <DashboardCard>
                  <H2>Hello</H2>
                  <VictoryStack
                    padding={30}
                    width={350}
                    colorScale={["purple", "red", "green"]}
                  >
                    {projects.map((i, v) => {
                      let now = new Date();
                      let start = now.setHours(24, 0, 0, 0);
                      let end = now.setHours(0, 0, 0, 0);
                      let projectEntry = [];
                      let day = 1000 * 60 * 60 * 24;

                      const sessionFilter = sessions.filter((el) => {
                        return el.project === i.name;
                      });

                      for (let a = 0; a < timePeriod; a++) {
                        let dateFilter = sessionFilter.filter((date) => {
                          return date.start > start && date.start > end;
                        });

                        let test = dateFilter.map((u, c) => {});

                        let dateTotal = 20;

                        const entry = {
                          x: Readable(end, "date"),
                          y: dateTotal,
                          n: i.name,
                        };

                        projectEntry.push(entry);

                        start = start - day;
                        end = end - day;
                      }

                      return (
                        <VictoryBar
                          animate={{
                            duration: 1000,
                          }}
                          key={v}
                          barWidth={(1 / timePeriod) * scale(200)}
                          data={projectEntry}
                        />
                      );
                    })}

                    <VictoryAxis />
                  </VictoryStack>
                </DashboardCard>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeView>
  );
};
