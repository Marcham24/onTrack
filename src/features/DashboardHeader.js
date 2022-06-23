import { StyleSheet, View, Dimensions } from "react-native";
import { SView, H1 } from "../infrastructure/commonStyles";
import { Logo } from "./logo";
import { scale } from "../infrastructure/scale";
const { width } = Dimensions.get("window");

export const DashboardHeader = () => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.sliderContainerStyle}>
        <View style={styles.slider}>
          <Logo project="D" color="#000000" full={false} size={scale(75)} />
          <H1>Dashboard</H1>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: "center",
    width: width,
    overflow: "hidden",
    height: width / 1.7,
  },
  sliderContainerStyle: {
    borderRadius: width * 2,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
  },
  slider: {
    alignItems: "center",
    height: width / 1.7,
    width: width,
    position: "absolute",
    padding: 50,
    bottom: 0,
    marginLeft: width / 2,
    backgroundColor: "#00000066",
  },
});
