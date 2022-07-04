import { useEffect, useRef } from "react";
import { ActivityIndicator, Animated } from "react-native";
import { H3 } from "../infrastructure/commonStyles";

export const LoadingIndicator = ({ isLoading = true }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0.975,
      duration: 800,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      return Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 2400);
  }, [isLoading, fadeAnim]);

  return (
    isLoading && (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 200,
          backgroundColor: "#dedede",
          elevation: 10,
          opacity: fadeAnim,
        }}
      >
        <ActivityIndicator color={"black"} size={"large"} visible={isLoading} />
        <H3>Working on it...</H3>
      </Animated.View>
    )
  );
};
