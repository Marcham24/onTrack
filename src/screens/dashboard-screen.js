import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { View, Text, ScrollView } from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { H1 } from "../infrastructure/commonStyles";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const DashboardScreen = () => {
  const data = [
    { quarter: 1, earnings: scale(5000) },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];
  return (
    <SafeView>
      <View>
        <ScrollView>
          <View
            style={{
              height: "30%",
              backgroundColor: "#353535",
              padding: 20,
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <View>
              <H1>Your{"\n"}Dashboard</H1>
              <Ionicons
                style={{
                  position: "absolute",
                  zIndex: -1,
                  left: 200,
                  top: -200,
                }}
                name="timer-outline"
                size={scale(350)}
                color="#404040"
              />
            </View>
          </View>
          {/* <View style={{ top: "-10%" }}>
        <PeriodTime calcDays={7} />
        <PeriodTime calcDays={30} />
      </View> */}
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 1,
              borderRadius: 100,
              height: 100,
              width: 100,
            }}
          >
            <Text style={{ fontSize: 50 }}>+</Text>
          </View>
          <View>
            <VictoryChart theme={VictoryTheme.material} width={scale(270)}>
              <VictoryBar data={data} x="quarter" y="earnings" horizontal />
            </VictoryChart>
          </View>
          <View>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryBar data={data} x="quarter" y="earnings" horizontal />
            </VictoryChart>
          </View>
          <View>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryBar data={data} x="quarter" y="earnings" horizontal />
            </VictoryChart>
          </View>
        </ScrollView>
      </View>
    </SafeView>
  );
};
