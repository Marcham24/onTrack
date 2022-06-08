import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const guidelineBaseWidth = 420;

export const scale = (size) => (width / guidelineBaseWidth) * size;
