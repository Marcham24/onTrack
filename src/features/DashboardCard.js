import { useState, useEffect } from "react";
import { Animated } from "react-native";
import styled from "styled-components";
import { scale } from "../infrastructure/scale";

export const DashboardCard = ({ children, backgroundColor }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const AnimDashboardCard = styled(Animated.View)`
  flex:1; 
  margin: ${(props) => scale(props.theme.space[1]) + "px"}
  border-radius: ${(props) => scale(props.theme.space[3]) + "px"};
  padding: ${(props) => scale(props.theme.space[4]) + "px"};
  background-color: ${(props) =>
    backgroundColor ? backgroundColor : props.theme.colors.white};

    shadow-color: #000;
shadow-offset: 0px 2px;
shadow-opacity: 0.25;
shadow-radius: 5px;
elevation: 20;
z-index:1
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
