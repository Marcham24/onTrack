import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { scale } from "../infrastructure/scale";
import { H2, H3 } from "../infrastructure/commonStyles";
import { VictoryPie, VictoryLabel } from "victory-native";
import { ConvertTime } from "../functions/convertTime";
import { Logo } from "./Logo";
import { arrayConvert } from "../features/ArrayConvert";
import { SessionContext } from "../services/array.context";
import { findColor } from "../functions/findColor";
import { Svg } from "react-native-svg";
import { Dimensions } from "react-native";
import { DashboardCard } from "./DashboardCard";
const { width } = Dimensions.get("window");
import { projects } from "../services/mock/array";

export const ProjectPie = ({ timePeriod, isLoading }) => {
  const { sessions } = useContext(SessionContext);

  const [selectedPieProject, setSelectedPieProject] = useState(null);
  const [selectedPieTime, setSelectedPieTime] = useState(null);

  const pieDims = width / 2 - scale(50);

  const projectNames = projects.map((i) => i.name);

  let projectWithTimes = [];

  let now = new Date();
  const day = 1000 * 60 * 60 * 24;

  const periodTime = now.setHours(23, 59, 59, 0) - day * timePeriod;

  projectNames.map((i) => {
    const projectTime = sessions
      .filter((el) => {
        return el.project === i;
      })
      .filter((date) => {
        return date.start > periodTime;
      })
      .reduce(
        (v, currentValue) =>
          (v = v + (currentValue.end.getTime() - currentValue.start.getTime())),
        0
      );
    const entry = {
      x: i,
      y: projectTime,
    };

    projectWithTimes.push(entry);
  });

  const projectWithTimesNoZeros = projectWithTimes
    .filter((x) => {
      return x.y !== 0;
    })
    .sort((a, b) => b.y - a.y);

  let projectColorsArray = [];

  projectWithTimesNoZeros.map((i, v) => {
    const color = findColor(i.x);

    projectColorsArray.push(color);
  });

  return (
    <>
      <DashboardCard isLoading={isLoading}>
        <H2>Project breakdown</H2>
        <View style={{ justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: scale(30),
            }}
          >
            <VictoryPie
              width={pieDims}
              height={pieDims}
              padding={0}
              startAngle={360}
              endAngle={0}
              labels={() => null}
              cornerRadius={4}
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
              padAngle={() => scale(1)}
              innerRadius={scale(40)}
              data={projectWithTimesNoZeros}
              colorScale={projectColorsArray}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Logo
              project={selectedPieProject ? selectedPieProject : "i"}
              color={
                selectedPieProject ? findColor(selectedPieProject) : "#000000"
              }
              full={false}
              size={scale(40)}
            />
            <View style={{ paddingLeft: scale(10) }}>
              <H3>
                {selectedPieProject ? selectedPieProject : "Tap for more"}
              </H3>
              <H3>{selectedPieProject ? selectedPieTime : "information"}</H3>
            </View>
          </View>
        </View>
      </DashboardCard>
    </>
  );
};
