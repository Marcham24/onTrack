import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "../infrastructure/scale";
import { findColor } from "../functions/findColor";

export const Btn = ({
  title,
  type = "normal",
  onPress,
  mimicInput = false,
  project,
}) => {
  const Opacity = styled.TouchableOpacity`
 flex-grow:1;
    background-color: ${
      mimicInput
        ? (props) => props.theme.colors.white
        : project
        ? findColor(project)
        : (props) => props.theme.colors.c2
    }
    padding: ${(props) => scale(props.theme.space[4]) + "px"};
    margin: ${(props) => scale(props.theme.space[1]) + "px"};
    flex-direction: row;
    border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
    justify-content: center;
    align-items: center;

  `;
  const Title = styled.Text`
    font-size: ${(props) => scale(props.theme.fontSizes.button) + "px"};
    font-family: ${mimicInput
      ? (props) => props.theme.fonts.light
      : (props) => props.theme.fonts.medium};
    font-weight: ${mimicInput
      ? (props) => props.theme.fontWeights.light
      : (props) => props.theme.fontWeights.medium};
    color: ${mimicInput
      ? (props) => props.theme.colors.c2
      : (props) => props.theme.colors.white};
    ${project && "text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4)"}
  `;

  const BtnView = styled.View``;

  const ICON = {
    none: "",
    normal: "arrow-forward",
    edit: "create",
    delete: "trash",
    back: "arrow-back",
    add: "add-circle",
    confirm: "checkmark-outline",
    cancel: "close-outline",
  };

  let iconName = ICON[type];

  return (
    <BtnView>
      <Opacity onPress={onPress} activeOpacity={0.8}>
        <Title>{title ? title + " " : ""}</Title>
        <Ionicons name={iconName} size={scale(12)} color="white" />
      </Opacity>
    </BtnView>
  );
};
