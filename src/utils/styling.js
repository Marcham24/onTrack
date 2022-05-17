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
export const fonts = ["Roboto_300Light", "RobotoCondensed_700Bold"];
export const spacing = ["5px", "10px", "15px", "20px", "30px", "40px"];

export const H1 = styled.Text`
  color: white;
`;

export const H2 = styled.Text`
  font-size: ${scale(fontSizes[5]) + "px"};
  color: ${colors.primary};
  font-weight: ${fontWeights[1]};
`;

export const H3 = styled.Text``;

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
  font-size: ${scale(16) + "px"};
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

export const ButtonPrimary = styled.TouchableOpacity`
background-color: ${colors.primary}
  padding: ${spacing[3]};
  margin:${spacing[2]};
  border-radius:${spacing[0]};

`;

export const ButtonSecondary = styled.TouchableOpacity`
background-color: ${colors.secondary}
  padding: ${spacing[3]};
  margin:${spacing[2]};
    border-radius:${spacing[0]}; 
  
`;

export const ButtonText = styled.Text`
  color: ${colors.tertiary};
  font-family: ${fonts[0]};
  font-weight: ${fontWeights[0]};
  text-align: center;
  font-family: ${fonts[1]};
  font-weight: ${fontWeights[1]};
  font-size: ${scale(fontSizes[2]) + "px"};
`;
