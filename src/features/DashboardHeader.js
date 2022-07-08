import { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { V, H1, TimePeriod } from "../infrastructure/commonStyles";
import { Logo } from "./Logo";
import { scale } from "../infrastructure/scale";
import { findColor } from "../functions/findColor";
import { projectBg } from "../functions/projectBg";

const { width } = Dimensions.get("window");

export const DashboardHeader = ({
  project,
  animatedValue,
  handler,
  timePeriod,
}) => {
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [scale(300), scale(80)],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerBorderRadius = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [scale(100), scale(25)],
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
    outputRange: [0, scale(89)],
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

  const padding = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [scale(75), 0],
    extrapolate: "clamp",
  });

  const headerScale = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.7],
    extrapolate: "clamp",
  });

  const handleChange = (time) => {
    handler(time);
  };

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
        <V row ac={"c"} mr={3} ml={project ? 6 : 0} pl={3}>
          <H1 size={20}> {projectName} </H1>
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
            style={[
              styles(color).headerLogo,
              {
                opacity: headerOpacity,
                transform: [{ scale: headerScale }],
              },
            ]}
          >
            <V ai="c">
              <Logo
                project={projectName}
                color={color}
                full={false}
                size={120}
              />
              <V pt={2} ai={"c"}>
                <H1> {projectName} </H1>
              </V>
            </V>
          </Animated.View>

          <Animated.View
            style={{ paddingLeft: padding, paddingRight: padding }}
          >
            <V row pt={4} pb={2} j={"sa"}>
              <TouchableOpacity onPress={() => handleChange(1)}>
                <V pb={1} ul={timePeriod === 1 ? true : false}>
                  <TimePeriod> Today </TimePeriod>
                </V>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChange(7)}>
                <V pb={1} ul={timePeriod === 7 ? true : false}>
                  <TimePeriod> 7 days </TimePeriod>
                </V>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChange(30)}>
                <V pb={1} ul={timePeriod === 30 ? true : false}>
                  <TimePeriod> 30 days </TimePeriod>
                </V>
              </TouchableOpacity>
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
