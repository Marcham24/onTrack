import styled from "styled-components/native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

//Guideline sizes are based on standard ~5.5" screen mobile device
const guidelineBaseWidth = 550;

const scale = (size) => (width / guidelineBaseWidth) * size;

export const H1 = styled.Text`
  color: white;
  font-size: ${scale(40) + "px"};
`;

export const H2 = styled.Text`
  font-size: ${scale(32) + "px"};
  color: #ffd369;
  font-family: RobotoCondensed_700Bold;
`;

export const H3 = styled.Text`
  font-size: ${scale(20) + "px"};
  color: white;
  font-family: Roboto_300Light;
`;

export const ProjectText = styled.Text`
  font-size: ${scale(24) + "px"};
  flex-wrap: wrap;
  font-family: RobotoCondensed_700Bold;
  flex-shrink: 1;
`;

export const TotalTimeText = styled.Text`
  font-size: ${scale(24) + "px"};
  font-family: RobotoCondensed_700Bold;
`;

export const CategoryText = styled.Text`
  font-size: ${scale(20) + "px"};
`;

export const TimeText = styled.Text`
  font-size: ${scale(18) + "px"};
  font-family: Roboto_300Light;
`;

export const TagssText = styled.Text`
  font-size: ${scale(18) + "px"};
  font-family: Roboto_300Light;
  text-decoration: underline;
  text-decoration-style: dotted;
  padding-right: 4px;
`;

export const BodyText = styled.Text`
  font-size: ${scale(14) + "px"};
`;

export const InputText = styled.Text`
  font-size: ${scale(16) + "px"};
`;
