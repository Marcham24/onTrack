import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const guidelineBaseWidth = 350;

export const scale = (size) => (width / guidelineBaseWidth) * size;
