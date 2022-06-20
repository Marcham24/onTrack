import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { TotalAllTime } from "./totalAllTime";
import { TotalTimeText } from "../infrastructure/commonStyles";
import { scale } from "../infrastructure/scale";

export const Logo = ({ project, size = 100, full, color, category }) => {
  let logoWording = project?.toString().charAt(0);

  const TotalTimeView = styled.View`
    position: absolute;
    top: ${(props) => scale(props.theme.space[2]) + "px"};
    left: ${(props) => scale(props.theme.space[2]) + "px"};
    background-color: ${(props) => props.theme.colors.inverse};
    border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
    padding: ${(props) => scale(props.theme.space[0]) + "px"}
      ${(props) => scale(props.theme.space[1]) + "px"};
    flex-direction: row;
  `;

  const LogoText = styled.Text`
    font-family: ${(props) => props.theme.fonts.logo};
    font-weight: ${(props) => props.theme.fontWeights.logo};
    color: ${(props) => props.theme.colors.white};
    text-align: center;
    font-size:${full ? size / 3 + "px" : size / 1.7 + "px"}
    flex:1
    flex-wrap: wrap
    flex-shrink:1
    text-shadow: 0px 0px 8px rgba(0,0,0,0.4);
  `;

  const LogoContainer = styled.View`
    background-color: ${color + "B3"};
    justify-content: center;
    align-items: center;
    border-top-left-radius: ${(props) => scale(props.theme.space[1]) + "px"};
    border-top-right-radius: ${(props) => scale(props.theme.space[1]) + "px"};
    border-bottom-left-radius: ${full
      ? "0px"
      : (props) => scale(props.theme.space[1]) + "px"};
    border-bottom-right-radius: ${full
      ? "0px"
      : (props) => scale(props.theme.space[1]) + "px"};
    flex-direction: row;
    width: ${size + "px"};
    height: ${full ? (size / 6) * 3 + "px" : size + "px"};
  `;

  return (
    <LogoContainer>
      {/* <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        style={{
          borderRadius: 5,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: full ? (size / 6) * 3 : size,
        }}
      /> */}

      {full && (
        <TotalTimeView>
          <TotalTimeText>
            <TotalAllTime project={project} projectSpecific={true} />
          </TotalTimeText>
        </TotalTimeView>
      )}
      <LogoText>{logoWording}</LogoText>
    </LogoContainer>
  );
};
