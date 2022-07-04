import { useState, useRef } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "../infrastructure/scale";
import { findColor } from "../functions/findColor";
import { H3 } from "../infrastructure/commonStyles";

export const DashboardAddButton = ({ project }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const buttonColor = findColor(project) || "#000";

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
    background-color: ${buttonColor};
    border-radius: 5px;
    padding: 10px;
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
      toValue: menuOpen ? 15 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateMenu = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: bottomAnim }],
        }}
      >
        <MenuItem bottom={scale(70)}>
          <H3 style={{ color: "white" }}>Manually add a new session</H3>
        </MenuItem>
      </Animated.View>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: bottomAnim }],
        }}
      >
        <MenuItem bottom={scale(110)}>
          <H3 style={{ color: "white" }}>Time a new session</H3>
        </MenuItem>
      </Animated.View>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: bottomAnim }],
        }}
      >
        <MenuItem bottom={scale(150)}>
          <H3 style={{ color: "white" }}>Add a new project</H3>
        </MenuItem>
      </Animated.View>

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
