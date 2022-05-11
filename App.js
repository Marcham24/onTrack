import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { TotalAllTime } from "./src/features/totalAllTime";
import { SessionContextProvider } from "./src/services/array.context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <SessionContextProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <TotalAllTime calcReq="week" />
          </View>
        </NavigationContainer>
      </SessionContextProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
