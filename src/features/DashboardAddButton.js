import { useState, useRef } from "react";
import { Animated, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "../infrastructure/scale";
import { findColor } from "../functions/findColor";
import { H3 } from "../infrastructure/commonStyles";

export const DashboardAddButton = ({ project }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const bottomAnim = useRef(new Animated.Value(300)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const buttonColor = findColor(project) || "#353535";

  const AddButton = styled.TouchableOpacity`
    background-color: ${buttonColor};
    border-radius: 8px;
    padding: 10px;
    flex: 1;
    position: absolute;
    right: ${scale(10) + "px"};
    bottom: ${scale(10) + "px"};

    elevation: 5;
    justify-content: center;
    align-items: center;
    align-content: center;
  `;
  const MenuItem = styled.TouchableOpacity`
    elevation: 10;
    background-color: ${buttonColor};
    border-radius: 5px;
    padding: 15px;
    position: absolute;
    right: ${scale(10) + "px"};
    bottom: ${(props) => scale(props.bottom) + "px"};
  `;

  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(spinAnim, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(bottomAnim, {
      toValue: menuOpen ? 300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateMenu = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });

  return (
    <>
      <MenuItem
        style={{
          transform: [{ translateX: bottomAnim }],
        }}
        bottom={scale(70)}
        onPress={() => console.log("session")}
      >
        <H3 style={{ color: "white" }}>Manually add a new session</H3>
      </MenuItem>

      <MenuItem
        style={{
          transform: [{ translateX: bottomAnim }],
        }}
        bottom={scale(120)}
        onPress={() => console.log("time")}
      >
        <H3 style={{ color: "white" }}>Time a new session</H3>
      </MenuItem>

      <MenuItem
        style={{
          transform: [{ translateX: bottomAnim }],
        }}
        bottom={scale(170)}
      >
        <H3 style={{ color: "white" }}>Add a new project</H3>
      </MenuItem>

      <AddButton
        onPress={handleOpenMenu}
        style={{ transform: [{ rotate: rotateMenu }] }}
      >
        {menuOpen ? (
          <Ionicons name={"close-outline"} size={scale(40)} color={"white"} />
        ) : (
          <Ionicons name={"add"} size={scale(40)} color={"white"} />
        )}
      </AddButton>
    </>
  );
};
