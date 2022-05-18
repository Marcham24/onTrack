import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export const Btn = ({ title, type = "normal", onPress, color }) => {
  const Opacity = styled.TouchableOpacity`
    background-color: ${color};
    padding: 15px;
    margin: 10px;
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    border-width: 1px;
    border-color: #dedede;
  `;
  const Title = styled.Text`
    font-size: 13px;
    font-weight: 700;
    font-family: RobotoCondensed_700Bold;
    color: black;
  `;

  const BtnView = styled.View`
    flex-grow: 1;
  `;

  const ICON = {
    normal: "arrow-forward-circle",
    edit: "create",
    delete: "trash",
    back: "arrow-back-circle",
  };

  let iconName = ICON[type];

  return (
    <BtnView>
      <Opacity onPress={onPress}>
        <Title> {title} </Title>
        <Ionicons name={iconName} size={18} color="black" />
      </Opacity>
    </BtnView>
  );
};
