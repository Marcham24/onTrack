import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { useState, useEffect, useContext } from "react";
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
import { arrayConvert } from "../features/ArrayConvert";
import { SessionContext } from "../services/array.context";

export const DashboardScreen = () => {
  const { sessions, rerender } = useContext(SessionContext);
  const [selectedPieProject, setSelectedPieProject] = useState(null);
  const [selectedPieTime, setSelectedPieTime] = useState(null);

  const data = arrayConvert(sessions);

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
          <View style={{ backgroundColor: "#353535" }}>
            <VictoryPie
              labels={() => null}
              cornerRadius={scale(4)}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          target: "data",
                          mutation: ({ datum, text }) => {
                            setSelectedPieProject(datum.x);
                            setSelectedPieTime(ConvertTime(datum.y));
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
              padAngle={() => scale(4)}
              innerRadius={scale(100)}
              style={{
                labels: {
                  fill: "white",
                  fontSize: scale(16),
                  fontWeight: 900,
                  fontFamily: "Inter_900Black",
                },
              }}
              data={data}
              colorScale={["#ff0000", "#ff1", "#FF0AAA", "#fa1"]}
            />
            <View>
              <Logo project={selectedPieProject} size={scale(50)} />
              <Text style={{ color: "white" }}>{selectedPieTime}</Text>
            </View>
          </View>
          <PeriodTime calcDays={7} />
        </ScrollView>
      </View>
    </SafeView>
  );
};
