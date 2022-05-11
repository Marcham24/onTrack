import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { TotalAllTime } from "./src/features/totalAllTime";
import { PeriodTime } from "./src/features/periodTime";
import { SessionContextProvider } from "./src/services/array.context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SessionView } from "./src/features/sessionOverview";
import Ionicons from "@expo/vector-icons/Ionicons";

const DashboardScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <TotalAllTime />
      </View>
      <View style={styles.side}>
        <PeriodTime calcDays={7} />
        <PeriodTime calcDays={30} />
      </View>
      <View>
        <SessionView />
      </View>
    </>
  );
};

const ProjectsScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const AddSessionScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const ExportScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const TAB_ICON = {
  Dashboard: "md-restaurant",
  Projects: "md-map",
  Export: "md-settings",
  Settings: "md-settings",
  " ": "md-settings",
};

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <SessionContextProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName = TAB_ICON[route.name];
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#ffd369",
              tabBarInactiveTintColor: "#393e46",
            })}
          >
            <Tab.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen name="Projects" component={ProjectsScreen} />
            <Tab.Screen name=" " component={AddSessionScreen} />
            <Tab.Screen name="Export" component={ExportScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
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
  side: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
