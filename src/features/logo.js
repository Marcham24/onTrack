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
        colors={["rgba(0,0,0,0.35)", "rgba(255,255,255,0.5)"]}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: (size / 6) * 3,
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
      height: (size / 6) * 3,
    },
    text: {
      textAlign: "center",
      color: "white",
      fontSize: full ? size / 7 : size / 3,
      fontFamily: "RobotoCondensed_700Bold",
      flex: 1,
      flexWrap: "wrap",
      flexShrink: 1,
    },
  });
