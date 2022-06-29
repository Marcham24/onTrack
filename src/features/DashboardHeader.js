import { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import { V, H1 } from "../infrastructure/commonStyles";
import { Logo } from "./logo";
import { scale } from "../infrastructure/scale";
import { findColor } from "../functions/findColor";
import { projectBg } from "./projectBg";
import { Btn } from "./Btn";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export const DashboardHeader = ({ project, animatedValue }) => {
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [scale(250), scale(50)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerBorderRadius = animatedValue.interpolate({
    inputRange: [0, 150, 170],
    outputRange: [scale(300), 24, 12],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerOpacity = animatedValue.interpolate({
    inputRange: [25, 125],
    outputRange: [1, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const subheaderPositionY = animatedValue.interpolate({
    inputRange: [75, 150],
    outputRange: [0, scale(83)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerMarginBottom = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [6, 150],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const color = project ? findColor(project) : "#353535";
  const projectName = project ? project : "Dashboard";

  const headerBG = animatedValue.interpolate({
    inputRange: [0, 150],
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
      <Animated.View
        style={[
          styles(color).subHeader,
          {
            transform: [{ translateY: subheaderPositionY }],
          },
        ]}
      >
        <V row ai={"c"}>
          <Logo project={projectName} color={color} full={false} size={40} />
          <H1
            style={[
              { marginLeft: "auto", marginRight: "auto" },
              { transform: [{ scale: 0.65 }] },
            ]}
          >
            {" "}
            {projectName}{" "}
          </H1>
          <Ionicons name={"add-circle"} size={scale(40)} color={"white"} />
        </V>
      </Animated.View>
      <Animated.View style={[styles(color).sliderContainerStyle]}>
        <Animated.View
          style={[
            styles(color).slider,
            {
              backgroundColor: headerBG,
            },
          ]}
        >
          <Animated.View
            style={[styles(color).headerLogo, { opacity: headerOpacity }]}
          >
            <Logo project={projectName} color={color} full={false} size={80} />

            <V p={3}>
              <H1> {projectName} </H1>
            </V>

            <Ionicons name={"add-circle"} size={scale(40)} color={"white"} />
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

      alignSelf: "center",
      width: width,
      overflow: "hidden",
      height: scale(250),
      backgroundColor: "#00000000",
    },
    sliderContainerStyle: {
      width: width * 2,
      height: scale(250),
      marginLeft: -(width / 2),
      position: "absolute",
      bottom: 0,
      overflow: "hidden",
    },
    slider: {
      height: scale(250),
      width: width,
      position: "absolute",

      bottom: 0,
      marginLeft: width / 2,
      backgroundColor: projectBg(color),
      justifyContent: "center",
    },
    headerLogo: {
      alignItems: "center",
    },
    subHeader: {
      top: -scale(80),
      opacity: 1,
      zIndex: 200,
    },
  });
