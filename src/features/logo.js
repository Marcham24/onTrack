import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { TotalAllTime } from "./totalAllTime";

export const Logo = ({ project, size = 100, full, color, category }) => {
  let logoWording = project?.toString().charAt(0);

  const TotalTimeView = styled.View`
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #efefef;
    border-radius: 5px;
    padding: 2px 5px;
    flex-direction: row;
  `;
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
          height: full ? (size / 6) * 3 : size,
        }}
      />
      <TotalTimeView>
        <TotalAllTime project={project} projectSpecific={true} />
      </TotalTimeView>

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
      height: full ? (size / 6) * 3 : size,
    },
    text: {
      textAlign: "center",
      color: "white",
      fontSize: full ? size / 3 : size / 1.7,
      fontFamily: "Inter_900Black",
      flex: 1,
      flexWrap: "wrap",
      flexShrink: 1,
    },
  });
