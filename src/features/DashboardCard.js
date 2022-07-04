import { useState, useEffect } from "react";
import { Animated } from "react-native";
import styled from "styled-components";
import { scale } from "../infrastructure/scale";

export const DashboardCard = ({ children, backgroundColor, rerender }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, rerender]);

  const AnimDashboardCard = styled(Animated.View)`

  flex:1; 
  margin: ${(props) => scale(props.theme.space[2]) + "px"}
  border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
  padding: ${(props) => scale(props.theme.space[4]) + "px"};
  background-color: ${(props) =>
    backgroundColor ? backgroundColor : props.theme.colors.white};

`;

  return (
    <AnimDashboardCard
      style={{
        opacity: fadeAnim,
      }}
    >
      {children}
    </AnimDashboardCard>
  );
};
