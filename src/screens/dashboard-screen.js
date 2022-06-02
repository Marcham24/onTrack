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

  const data = arrayConvert(sessions);

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
              labels={() => null}
              startAngle={135}
              endAngle={-135}
              cornerRadius={120}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          target: "labels",
                          mutation: ({ datum, text }) => {
                            return text === datum.x + ConvertTime(datum.y)
                              ? null
                              : { text: datum.x + ConvertTime(datum.y) };
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
              padAngle={() => scale(5)}
              innerRadius={scale(100)}
              style={{
                labels: {
                  fill: "white",
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
