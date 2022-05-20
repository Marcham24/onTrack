import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "../infrastructure/scale";

export const Btn = ({
  title,
  type = "normal",
  onPress,
  mimicInput = false,
}) => {
  const Opacity = styled.TouchableOpacity`
    border-width: ${mimicInput ? "1px" : "0px"}
    border-color: ${
      mimicInput
        ? (props) => props.theme.colors.c4
        : (props) => props.theme.colors.c2
    }
    background-color: ${
      mimicInput
        ? (props) => props.theme.colors.inverse
        : (props) => props.theme.colors.c2
    }
    padding: ${(props) => scale(props.theme.space[1]) + "px"};
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
  `;

  const BtnView = styled.View`
    flex-grow: 1;
  `;

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
        <Title> {title} </Title>
        <Ionicons name={iconName} size={scale(15)} color="white" />
      </Opacity>
    </BtnView>
  );
};
