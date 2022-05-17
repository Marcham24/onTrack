import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { TotalAllTime } from "./src/features/totalAllTime";
import { PeriodTime } from "./src/features/periodTime";
import { SessionContextProvider } from "./src/services/array.context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SessionView } from "./src/features/sessionOverview";
import { ViewProjects } from "./src/features/ProjectsList";
import { ViewSessions } from "./src/features/SessionsList";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts as useRoboto,
  Roboto_300Light,
} from "@expo-google-fonts/roboto";
import {
  useFonts as useRobotoCondensed,
  RobotoCondensed_700Bold,
} from "@expo-google-fonts/roboto-condensed";
import { AddProject } from "./src/features/AddProject";

import {
  H1,
  H2,
  H3,
  ProjectText,
  CategoryText,
  TimeText,
  TagssText,
  BodyText,
  InputText,
  ButtonPrimary,
  ButtonText,
  ButtonSecondary,
} from "./src/utils/styling";

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

      <SessionView />
    </>
  );
};

const ProjectsScreen = () => {
  return (
    <>
      <View>
        <ViewProjects />
      </View>
    </>
  );
};

const AddSessionScreen = () => {
  return (
    <View>
      <ViewSessions />
    </View>
  );
};

const ExportScreen = () => {
  return (
    <View>
      <AddProject />
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View>
      <H2>Testing</H2>
      <H3>Testing</H3>
      <ButtonPrimary onPress={() => alert("Hello")}>
        <ButtonText>Testing button</ButtonText>
      </ButtonPrimary>
      <ButtonSecondary>
        <ButtonText>Testing button</ButtonText>
      </ButtonSecondary>
    </View>
  );
};

const TAB_ICON = {
  Dashboard: "grid-outline",
  Projects: "file-tray-full-outline",
  Sessions: "arrow-down-circle-outline",
  Settings: "settings-outline",
  " ": "add-circle",
};

export default function App() {
  const Tab = createBottomTabNavigator();
  const [robotoLoaded] = useRoboto({
    Roboto_300Light,
  });

  const [robotoCondensedLoaded] = useRobotoCondensed({
    RobotoCondensed_700Bold,
  });

  if (!robotoLoaded || !robotoCondensedLoaded) {
    return null;
  }

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
              tabBarActiveTintColor: "#EF8354",
              tabBarInactiveTintColor: "#4F5D75",
            })}
          >
            <Tab.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen name="Projects" component={ProjectsScreen} />
            <Tab.Screen name=" " component={AddSessionScreen} />
            <Tab.Screen name="Sessions" component={ExportScreen} />
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
    backgroundColor: "#white",
    alignItems: "center",
    justifyContent: "center",
  },
  side: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#white",
    alignItems: "center",
    justifyContent: "center",
  },
});
