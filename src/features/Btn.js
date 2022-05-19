import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "../infrastructure/scale";

export const Btn = ({ title, type = "normal", onPress }) => {
  const Opacity = styled.TouchableOpacity`
    background-color: ${(props) => props.theme.colors.c2}
    padding: ${(props) => scale(props.theme.space[2]) + "px"};
    margin: ${(props) => scale(props.theme.space[1]) + "px"};
    flex-direction: row;
    border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
    justify-content: center;
    
    align-items: center;
  `;
  const Title = styled.Text`
    font-size: ${(props) => scale(props.theme.fontSizes.button) + "px"};
    font-family: ${(props) => props.theme.fonts.medium};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    color: white;
  `;

  const BtnView = styled.View`
    flex-grow: 1;
  `;

  const ICON = {
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
