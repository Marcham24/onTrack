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

const { width } = Dimensions.get("window");

export const DashboardHeader = ({ project, animatedValue }) => {
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 300],
    outputRange: [width / 1.5, 150],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerBorderRadius = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [width, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  const headerOpacity = animatedValue.interpolate({
    inputRange: [0, 150],
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

  const color = project ? findColor(project) : "#353535";
  const projectName = project ? project : "Dashboard";

  const headerBG = animatedValue.interpolate({
    inputRange: [0, 250],
    outputRange: [projectBg(color), color],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles(color).containerStyle,
        {
          height: headerHeight,
        },
      ]}
    >
      <Animated.View
        style={[
          styles(color).sliderContainerStyle,
          {
            borderBottomLeftRadius: headerBorderRadius,
            borderBottomRightRadius: headerBorderRadius,
          },
        ]}
      >
        <Animated.View
          style={[
            styles(color).slider,
            {
              backgroundColor: headerBG,
            },
          ]}
        >
          {/* <Animated.View>
            <Btn type={"add"} />
          </Animated.View> */}

          <Animated.View
            style={[
              styles(color).logo,
              { opacity: headerOpacity, height: headerHeight },
            ]}
          >
            <ImageBackground
              source={require("../../assets/pexels-iva-muškić-691710.jpg")}
              resizeMode="cover"
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <View style={{ padding: 40, alignItems: "center" }}>
                <Logo
                  project={projectName}
                  color={color}
                  full={false}
                  size={scale(100)}
                />
                <SView p={2}>
                  <H1> {projectName} </H1>
                </SView>
              </View>
            </ImageBackground>
          </Animated.View>
          <Animated.View
            style={[
              {
                position: "absolute",
                bottom: 0,
                paddingLeft: 12,
                paddingBottom: 4,
                zIndex: 2000,
              },
              { opacity: subheaderOpacity },
            ]}
          >
            <H1>{projectName}</H1>
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
      height: width,
      backgroundColor: "#00000000",
    },
    sliderContainerStyle: {
      width: width * 2,
      height: width * 2,
      marginLeft: -(width / 2),
      position: "absolute",
      bottom: 0,
      overflow: "hidden",
    },
    slider: {
      height: width / 1.5,
      width: width,
      position: "absolute",
      padding: 0,
      bottom: 0,
      marginLeft: width / 2,
      backgroundColor: projectBg(color),
    },
    logo: {
      alignItems: "center",
    },
  });
