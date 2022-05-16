import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { CategoryText, ProjectText } from "../utils/styling";

export const Logo = ({ project, size = 100, full, color, category }) => {
  let logoWording;

  !full
    ? (logoWording = project?.toString().charAt(0))
    : (logoWording = project);

  return (
    <View style={[styles(size, color, full, project, category).logo]}>
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "transparent"]}
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: (size / 5) * 4,
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
      borderRadius: 10,

      flexDirection: "row",
      width: size,
      height: size,
    },
    text: {
      padding: 5,
      textAlign: "center",
      color: "white",
      fontSize: full ? size / 7 : size / 1.5,
      fontFamily: "RobotoCondensed_700Bold",
      flex: 1,
      flexWrap: "wrap",
      flexShrink: 1,
    },
  });
