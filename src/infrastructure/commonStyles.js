import styled from "styled-components/native";
import { scale } from "./scale";

export const H1 = styled.Text`
  font-size: ${(props) => scale(props.theme.fontSizes.h1) + "px"};
  font-family: ${(props) => props.theme.fonts.logo};
  font-weight: ${(props) => props.theme.fontWeights.logo};
  color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => scale(props.theme.space[4]) + "px"};
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
