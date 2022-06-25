import { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import { SView, H1 } from "../infrastructure/commonStyles";
import { Logo } from "./logo";
import { scale } from "../infrastructure/scale";
import { findColor } from "../functions/findColor";
import { projectBg } from "./projectBg";
import { Btn } from "./Btn";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export const DashboardHeader = ({ project, animatedValue }) => {
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [scale(300), scale(50)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerBorderRadius = animatedValue.interpolate({
    inputRange: [0, 100, 120],
    outputRange: [scale(300), 24, 12],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerOpacity = animatedValue.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const subheaderOpacity = animatedValue.interpolate({
    inputRange: [50, 150],
    outputRange: [0, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerMarginBottom = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [scale(6), scale(106)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const logoScale = animatedValue.interpolate({
    inputRange: [0, 25],
    outputRange: [1, 0.5],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const logoPositionX = animatedValue.interpolate({
    inputRange: [25, 100],
    outputRange: [0, -width + scale(40) + scale(12)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const logoPositionY = animatedValue.interpolate({
    inputRange: [50, 100],
    outputRange: [0, width - scale(86)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const logoRotation = animatedValue.interpolate({
    inputRange: [25, 100],
    outputRange: ["360deg", "0deg"],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const addPositionX = animatedValue.interpolate({
    inputRange: [70, 145],
    outputRange: [0, width - scale(225) - scale(12)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const addPositionY = animatedValue.interpolate({
    inputRange: [70, 100],
    outputRange: [0, width - scale(350)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const addRotation = animatedValue.interpolate({
    inputRange: [70, 145],
    outputRange: ["0deg", "360deg"],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const projectScale = animatedValue.interpolate({
    inputRange: [25, 50],
    outputRange: [1, scale(0.6)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const color = project ? findColor(project) : "#353535";
  const projectName = project ? project : "Dashboard";

  const headerBG = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [projectBg(color), color],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles(color).containerStyle,
        {
          height: headerHeight,
          borderBottomLeftRadius: headerBorderRadius,
          borderBottomRightRadius: headerBorderRadius,
          marginBottom: headerMarginBottom,
        },
      ]}
    >
      <Animated.View style={[styles(color).sliderContainerStyle]}>
        <Animated.View
          style={[
            styles(color).slider,
            {
              backgroundColor: headerBG,
            },
          ]}
        >
          <Animated.View style={[styles(color).headerLogo]}>
            <Animated.View
              style={{
                transform: [
                  { scale: logoScale },
                  { translateX: logoPositionX },
                  { translateY: logoPositionY },
                  { rotate: logoRotation },
                ],
              }}
            >
              <Logo
                project={projectName}
                color={color}
                full={false}
                size={80}
              />
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ scale: projectScale }],
              }}
            >
              <H1> {projectName} </H1>
            </Animated.View>
            <Animated.View
              style={{
                transform: [
                  { translateX: addPositionX },
                  { translateY: addPositionY },
                  { rotate: addRotation },
                ],
              }}
            >
              <Ionicons name={"add-circle"} size={40} color={"black"} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = (color) =>
  StyleSheet.create({
    containerStyle: {
      marginBottom: 50,
      zIndex: 0,
      alignSelf: "center",
      width: width,
      overflow: "hidden",
      height: width,
      backgroundColor: "#00000000",
    },
    sliderContainerStyle: {
      width: width * 2,
      height: width,
      marginLeft: -(width / 2),
      position: "absolute",
      bottom: 0,
      overflow: "hidden",
    },
    slider: {
      height: scale(300),
      width: width,
      position: "absolute",
      padding: 0,
      bottom: 0,
      marginLeft: width / 2,
      backgroundColor: projectBg(color),

      justifyContent: "center",
    },
    headerLogo: {
      alignItems: "center",
    },
  });
