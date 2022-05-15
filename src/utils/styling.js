import styled from "styled-components/native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";

//Guideline sizes are based on standard ~5.5" screen mobile device
const guidelineBaseWidth = 550;

const scale = (size) => (width / guidelineBaseWidth) * size;

export const Gradient = styled(
  LinearGradient
)`        colors={["rgba(0,0,0,0.6)", "transparent"]}
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: (size / 5) * 4,
        }} `;

export const H1 = styled.Text`
  color: white;
  font-size: ${scale(32) + "px"};
`;

export const H2 = styled.Text`
  font-size: ${scale(28) + "px"};
  color: white;
  font-family: RobotoCondensed_700Bold;
`;

export const H3 = styled.Text`
  font-size: ${scale(24) + "px"};
  color: ${(props) => props.fontColor || "white"}
  font-family: Roboto_300Light;
`;

export const ProjectText = styled.Text`
  font-size: ${scale(20) + "px"};
  flex-wrap: wrap;
  font-family: RobotoCondensed_700Bold;
  flex-shrink: 1;
  color: #1c1d23;
`;

export const TotalTimeText = styled.Text`
  font-size: ${scale(20) + "px"};
  font-family: RobotoCondensed_700Bold;
`;

export const CategoryText = styled.Text`
  font-size: ${scale(20) + "px"};
  text-decoration: underline;
  text-decoration-style: dotted;
`;

export const TimeText = styled.Text`
  font-size: ${scale(16) + "px"};
  font-family: Roboto_300Light;
`;

export const TagssText = styled.Text`
  font-size: ${scale(16) + "px"};
  font-family: Roboto_300Light;
  text-decoration: underline;
  text-decoration-style: dotted;
  padding-right: 4px;
  color: #393b46;
`;

export const BodyText = styled.Text`
  font-size: ${scale(14) + "px"};
`;

export const InputText = styled.Text`
  font-size: ${scale(16) + "px"};
`;
