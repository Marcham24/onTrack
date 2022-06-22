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

                  tabBarActiveTintColor: "white",
                  tabBarInactiveTintColor: "grey",
                  tabBarInactiveBackgroundColor: "black",
                  tabBarActiveBackgroundColor: "black",
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
                  options={{
                    headerStyle: { backgroundColor: "black" },
                    headerTitleStyle: { color: "white" },
                  }}
                />
                <Tab.Screen
                  name=" "
                  component={AddSessionScreen}
                  options={{
                    headerStyle: { backgroundColor: "black" },
                    headerTitleStyle: { color: "white" },
                  }}
                />
                <Tab.Screen
                  name="Sessions"
                  component={ExportScreen}
                  options={{
                    headerStyle: { backgroundColor: "black" },
                    headerTitleStyle: { color: "white" },
                  }}
                />
                <Tab.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    headerStyle: { backgroundColor: "black" },
                    headerTitleStyle: { color: "white" },
                  }}
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
