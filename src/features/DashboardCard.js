import { useState, useRef, useEffect } from "react";
import { Animated, View } from "react-native";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import { scale } from "../infrastructure/scale";
import { V } from "../infrastructure/commonStyles";

export const DashboardCard = ({ children, backgroundColor, isLoading }) => {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, [isLoading, opacityAnim]);

  const DashboardCard = styled(Animated.View)`
  flex:1; 
  margin: ${(props) => scale(props.theme.space[2]) + "px"}
  border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
  padding: ${(props) => scale(props.theme.space[4]) + "px"};
  background-color: ${(props) =>
    isLoading
      ? props.theme.colors.c4
      : backgroundColor
      ? backgroundColor
      : props.theme.colors.white};

`;

  const measure = ({ nativeEvent }) => {
    setContentWidth(nativeEvent.layout.width);
    setContentHeight(nativeEvent.layout.height);
  };
  return (
    <DashboardCard
      style={{
        opacity: isLoading ? opacityAnim : 1,
      }}
    >
      {!isLoading ? (
        <View onLayout={measure} style={{ flex: 1 }}>
          {children}
        </View>
      ) : (
        <Animated.View style={{}}>
          <Animated.View
            style={{
              width: contentWidth || "90%",
              height: contentHeight || scale(300),
            }}
          >
            <V style={{ width: "90%", height: 30 }} bg={"c3"} br></V>
            <V ai="c" j="c" grow>
              <ActivityIndicator size="large" color="#000" />
            </V>
          </Animated.View>
        </Animated.View>
      )}
    </DashboardCard>
  );
};
