import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Logo = ({ project, size = 100, full, color, category }) => {
  let logoWording;

  !full
    ? (logoWording = project?.toString().charAt(0))
    : (logoWording = project);

  return (
    <View style={[styles(size, color, full, project, category).logo]}>
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        style={{
          borderRadius: 5,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: size,
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
      borderRadius: 5,
      flexDirection: "row",
      width: size,
      height: size,
    },
    text: {
      textAlign: "center",
      color: "white",
      fontSize: full ? size / 7 : size / 1.7,
      fontFamily: "RobotoCondensed_700Bold",
      flex: 1,
      flexWrap: "wrap",
      flexShrink: 1,
    },
  });
