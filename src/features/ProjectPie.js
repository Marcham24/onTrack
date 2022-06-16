import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { scale } from "../infrastructure/scale";
import { H2, H3 } from "../infrastructure/commonStyles";
import { VictoryPie, VictoryLabel } from "victory-native";
import { ConvertTime } from "../features/convertTime";
import { Logo } from "../features/logo";
import { arrayConvert } from "../features/ArrayConvert";
import { SessionContext } from "../services/array.context";
import { findColor } from "../functions/findColor";
import { Svg } from "react-native-svg";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const ProjectPie = ({ timePeriod }) => {
  const { sessions } = useContext(SessionContext);

  const data = arrayConvert(sessions, "", timePeriod);
  const color = arrayConvert(sessions, "colors", timePeriod);

  const [selectedPieProject, setSelectedPieProject] = useState(null);
  const [selectedPieTime, setSelectedPieTime] = useState(null);

  const pieDims = width / 2 - scale(30);

  return (
    <>
      <H2>Project breakdown</H2>
      <View style={{ justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: scale(20),
          }}
        >
          <VictoryPie
            width={pieDims}
            height={pieDims}
            padding={0}
            startAngle={360}
            endAngle={0}
            labels={() => null}
            animate={{
              duration: 500,
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
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Logo
            project={selectedPieProject ? selectedPieProject : null}
            color={selectedPieProject ? findColor(selectedPieProject) : "black"}
            full={false}
            size={scale(40)}
          />
          <View style={{ paddingLeft: scale(10) }}>
            <H3>{selectedPieProject ? selectedPieProject : "Tap for more"}</H3>
            <H3>{selectedPieProject ? selectedPieTime : "information"}</H3>
          </View>
        </View>
      </View>
    </>
  );
};
