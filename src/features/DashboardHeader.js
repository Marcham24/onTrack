import { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import { V, H1, BodyText } from "../infrastructure/commonStyles";
import { Logo } from "./Logo";
import { scale } from "../infrastructure/scale";
import { findColor } from "../functions/findColor";
import { projectBg } from "../functions/projectBg";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export const DashboardHeader = ({ project, animatedValue }) => {
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [scale(300), scale(50)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerBorderRadius = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [scale(75), scale(12)],
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
        <V row ai={"c"} pl={2} pr={2}>
          <Logo project={projectName} color={color} full={false} size={40} />
          <H1
            style={[
              { marginLeft: "auto", marginRight: "auto" },
              { transform: [{ scale: 0.65 }] },
            ]}
          >
            {projectName}
          </H1>
          <Ionicons
            name={"ellipsis-vertical"}
            size={scale(25)}
            color={"white"}
          />
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
            <V pl={3} pb={6} ai="c">
              <Logo
                project={projectName}
                color={color}
                full={false}
                size={120}
              />
              <V row pt={2} ai={"c"}>
                <V pr={2}>
                  <H1> {projectName} </H1>
                </V>
                <Ionicons
                  name={"ellipsis-vertical"}
                  size={scale(25)}
                  color={"white"}
                />
              </V>
            </V>
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
      height: scale(300),
      backgroundColor: "#00000000",
    },
    sliderContainerStyle: {
      width: width * 2,
      height: scale(300),
      marginLeft: -(width / 2),
      position: "absolute",
      bottom: 0,
      overflow: "hidden",
    },
    slider: {
      height: scale(300),
      width: width,
      position: "absolute",

      bottom: 0,
      marginLeft: width / 2,
      backgroundColor: projectBg(color),
      justifyContent: "flex-end",
    },

    subHeader: {
      top: -scale(80),
      opacity: 1,
      zIndex: 200,
    },
  });
