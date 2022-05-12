import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Logo = ({ project, size = 100, full = true, color }) => {
  let logoWording;

  !full
    ? (logoWording = project.toString().charAt(0))
    : (logoWording = project);

  return (
    <View style={[styles(size, color, full).logo]}>
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        style={{
          borderTopLeftRadius: size / 10,
          borderTopRightRadius: size / 10,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: (size / 5) * 2,
        }}
      />
      <Text style={[styles(size, color, full).text]}>{logoWording}</Text>
    </View>
  );
};

const styles = (size, color, full) =>
  StyleSheet.create({
    logo: {
      backgroundColor: color,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: size / 10,
      flexDirection: "row",
      width: size,
      height: size,
    },
    text: {
      padding: 20,
      textAlign: "center",
      color: "white",
      fontSize: full ? size / 6 : size / 2,
      fontFamily: "RobotoCondensed_700Bold",
      flex: 1,
      flexWrap: "wrap",
      flexShrink: 1,
    },
  });
