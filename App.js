import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { SessionContextProvider } from "./src/services/array.context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import { DashboardScreen } from "./src/screens/dashboard-screen";
import { AddSession } from "./src/features/AddSession";
import { SView, H1 } from "./src/infrastructure/commonStyles";
import { Btn } from "./src/features/Btn";

const ProjectsScreen = () => {
  return (
    <>
      <ViewProjects />
    </>
  );
};

const AddSessionScreen = () => {
  return <ViewSessions />;
};

const ExportScreen = () => {
  return <AddProject />;
};

const SettingsScreen = () => {
  return <AddSession />;
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
          <NavigationContainer>
            <SafeView>
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
                    headerLeft: ({ navigation }) => (
                      <Btn onPress={() => navigation.push("Dashboard")} />
                    ),
                  }}
                />
              </Tab.Navigator>
            </SafeView>
          </NavigationContainer>
        </SessionContextProvider>
      </ThemeProvider>

      <ExpoStatusBar />
    </>
  );
}
