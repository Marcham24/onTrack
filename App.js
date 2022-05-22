import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { TotalAllTime } from "./src/features/totalAllTime";
import { PeriodTime } from "./src/features/periodTime";
import { SessionContextProvider } from "./src/services/array.context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SessionView } from "./src/features/sessionOverview";
import { ViewProjects } from "./src/features/ProjectsList";
import { ViewSessions } from "./src/features/SessionsList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeView } from "./src/components/safeView";

import {
  useFonts as useInter,
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { AddProject } from "./src/features/AddProject";
import {
  BodyText,
  CategoryText,
  H1,
  H2,
  H3,
  Input,
  ProjectText,
  TagssText,
  TimeText,
  TotalTimeText,
} from "./src/infrastructure/commonStyles";
import { Btn } from "./src/features/Btn";
import { TextInput } from "react-native-paper";
import { ModalBase } from "./src/features/ModalBase";
import { DashboardScreen } from "./src/screens/dashboard-screen";
import { EditingModal } from "./src/features/editingModal";
import { AddSession } from "./src/features/AddSession";

const ProjectsScreen = () => {
  return (
    <>
      <SafeView>
        <ViewProjects />
      </SafeView>
    </>
  );
};

const AddSessionScreen = () => {
  return (
    <>
      <SafeView>
        <ViewSessions />
      </SafeView>
      <ExpoStatusBar style="auto" />
    </>
  );
};

const ExportScreen = () => {
  return (
    <SafeView>
      <AddProject />
    </SafeView>
  );
};

const SettingsScreen = () => {
  return (
    <SafeView>
      <AddSession />
    </SafeView>
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

  const [interLoaded] = useInter({
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!interLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <SessionContextProvider>
          <SafeView>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    let iconName = TAB_ICON[route.name];
                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
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
                <Tab.Screen
                  name="Projects"
                  component={ProjectsScreen}
                  options={{ headerShown: false }}
                />
                <Tab.Screen
                  name=" "
                  component={AddSessionScreen}
                  options={{ headerShown: false }}
                />
                <Tab.Screen
                  name="Sessions"
                  component={ExportScreen}
                  options={{ headerShown: false }}
                />
                <Tab.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{ headerShown: false }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeView>
        </SessionContextProvider>
      </ThemeProvider>
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
