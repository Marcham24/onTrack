import styled from "styled-components/native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const guidelineBaseWidth = 550;

const scale = (size) => (width / guidelineBaseWidth) * size;

export const colors = {
  primary: "#D0421B",
  secondary: "#757575",
  tertiary: "#F1F1F1",
  quaternary: "#FFFFFF",
  disabled: "#DEDEDE",
  error: "#D0421B",
  success: "#138000",
};

export const fontSizes = ["12", "15", "18", "20", "24", "28", "32"];
export const fontWeights = ["300", "700"];
export const fonts = [
  "Roboto_300Light",
  "RobotoCondensed_700Bold",
  "Inter_300Light",
  "Inter_700Bold",
];
export const spacing = ["5px", "10px", "15px", "20px", "30px", "40px"];

export const H1 = styled.Text`
  color: white;
`;

export const H2 = styled.Text`
  font-size: ${scale(fontSizes[4]) + "px"};
  color: ${colors.secondary};
  font-weight: ${fontWeights[1]};
  font-family: ${fonts[1]};
`;

export const H3 = styled.Text``;

export const ProjectText = styled.Text`
  font-size: ${scale(18) + "px"};
  flex-wrap: wrap;
  font-family: Inter_700Bold;
  flex-shrink: 1;
  color: #1c1d23;
`;

export const TotalTimeText = styled.Text`
  font-size: ${scale(20) + "px"};
  font-family: RobotoCondensed_700Bold;
`;

export const CategoryText = styled.Text`
  font-size: ${scale(16) + "px"};
  text-decoration: underline;
  text-decoration-style: dotted;
  font-family: Inter_300Light;
`;

export const TimeText = styled.Text`
  font-size: ${scale(16) + "px"};
  font-family: Inter_300Light;
`;

export const TagssText = styled.Text`
  font-size: ${scale(16) + "px"};
  font-family: Roboto_300Light;
  text-decoration: underline;
  text-decoration-style: dotted;
  margin-right: 5px;
  padding: 3px 5px;
  color: white;
  border-radius: 10px;
`;

export const BodyText = styled.Text`
  font-size: ${scale(14) + "px"};
`;

export const Input = styled.TextInput`
  font-size: 13px;
  background-color: white;
  border-width: 1px;
  border-color: #DEDEDE
  border-radius: 5px;
  padding: 10px; 
  margin: 10px;
  color:black;
  flex-shrink:1;
  flex-grow:1;
`;
