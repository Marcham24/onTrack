import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { H1 } from "../infrastructure/commonStyles";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryContainer,
} from "victory-native";
import { ConvertTime } from "../features/convertTime";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Logo } from "../features/logo";
import { G } from "react-native-svg";
import { exp } from "react-native/Libraries/Animated/Easing";

export const DashboardScreen = () => {
  const data = [
    { x: "G", y: 20000000 },
    { x: "W", y: 30000000 },
    { x: "P", y: 10000000 },
    { x: "A", y: 15000000 },
  ];

  const [graphicData, setGraphicData] = useState(0);

  useEffect(() => {
    setGraphicData(50); // Setting the data that we want to display
  }, []);
  return (
    <SafeView>
      <View>
        <ScrollView>
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
            <H1>Dashboard</H1>
            <Logo project="D" color="#353535" full={false} size={scale(50)} />
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "#353535" }}>
            <VictoryPie
              animate={{
                duration: 5000,
                easing: "exp",
              }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          target: "labels",
                          mutation: ({ datum, text }) => {
                            return text === ConvertTime(datum.y)
                              ? null
                              : { text: ConvertTime(datum.y) };
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
              labelRadius={({ innerRadius }) => innerRadius + scale(30)}
              padAngle={() => scale(2)}
              innerRadius={scale(graphicData)}
              style={{
                labels: {
                  fill: "black",
                  fontSize: scale(16),
                  fontWeight: 900,
                  fontFamily: "Inter_900Black",
                },
              }}
              containerComponent={
                <VictoryContainer
                  domainPadding={{ x: 40 }}
                  standalone={false}
                />
              }
              data={data}
              colorScale={["#ff0000", "#ff1", "#FF0AAA", "#fa1"]}
            />
          </View>
          <PeriodTime calcDays={7} />
        </ScrollView>
      </View>
    </SafeView>
  );
};
