import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { scale } from "../infrastructure/scale";

export const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.inverse};
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight / 2}px`};
`;
