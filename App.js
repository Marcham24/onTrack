import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { SessionContextProvider } from "./src/services/array.context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ViewProjects } from "./src/features/ProjectsList";
import { SessionSearch } from "./src/features/SessionSearch";
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
import { H1, V } from "./src/infrastructure/commonStyles";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { scale } from "./src/infrastructure/scale";

const ProjectsScreen = () => {
  return (
    <V>
      <H1>Hello</H1>
    </V>
  );
};

const ProjectsDashboard = (props) => {
  return <DashboardScreen {...props} />;
};

const AddSessionScreen = () => {
  return <AddSession />;
};

const AddProjectScreen = () => {
  return <AddProject />;
};

const SettingsScreen = () => {
  return <SessionSearch />;
};

// const TAB_ICON = {
//   Dashboard: "grid-outline",
//   Projects: "file-tray-full-outline",
//   Sessions: "arrow-down-circle-outline",
//   Settings: "settings-outline",
//   " ": "add-circle",
// };

export default function App() {
  const Stack = createStackNavigator();

  const [interLoaded] = useInter({
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!interLoaded) {
    return null;
  }

  // ! This is a comment

  return (
    <>
      <ThemeProvider theme={theme}>
        <SessionContextProvider>
          <NavigationContainer>
            <SafeView>
              <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen
                  name="Dashboard"
                  component={DashboardScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Projects"
                  component={ProjectsScreen}
                  options={{
                    headerStyle: { backgroundColor: "#dcdcdc" },
                    headerTitleStyle: { color: "#000000" },
                  }}
                />
                <Stack.Screen
                  name="Project Dashboard"
                  component={ProjectsDashboard}
                  options={{
                    headerMode: "float",
                    headerTitle: "",
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: "#FFF",
                    headerTitleVisible: false,
                    headerRight: () => (
                      <V pr={2}>
                        <Ionicons
                          name={"ellipsis-vertical"}
                          size={scale(20)}
                          color={"white"}
                        />
                      </V>
                    ),
                  }}
                />
                <Stack.Screen
                  name="Add a session"
                  component={AddSessionScreen}
                  options={{
                    headerStyle: { backgroundColor: "#dcdcdc" },
                  }}
                />
                <Stack.Screen
                  name="Add a project"
                  component={AddProjectScreen}
                  options={{
                    headerStyle: { backgroundColor: "#dcdcdc" },
                    headerTitleStyle: { color: "#000000" },
                  }}
                />
                <Stack.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    headerStyle: { backgroundColor: "#dcdcdc" },
                    headerTitleStyle: { color: "#000000" },
                  }}
                />
              </Stack.Navigator>
              {/* <Tab.Navigator
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
                  tabBarHideOnKeyboard: true,
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
                    headerStyle: { backgroundColor: "#dcdcdc" },
                    headerTitleStyle: { color: "#000000" },
                  }}
                />
                <Tab.Screen
                  name=" "
                  component={AddSessionScreen}
                  options={{
                    headerStyle: { backgroundColor: "#dcdcdc" },
                    headerTitleStyle: { color: "#000000" },
                  }}
                />
                <Tab.Screen
                  name="Sessions"
                  component={ExportScreen}
                  options={{
                    headerStyle: { backgroundColor: "#dcdcdc" },
                    headerTitleStyle: { color: "#000000" },
                  }}
                />
                <Tab.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    headerStyle: { backgroundColor: "#dcdcdc" },
                    headerTitleStyle: { color: "#000000" },
                    //headerLeft: ({ navigation }) => (
                    //<Btn onPress={() => navigation.push("Dashboard")} />
                    //),
                  }}
                />
              </Tab.Navigator> */}
            </SafeView>
          </NavigationContainer>
        </SessionContextProvider>
      </ThemeProvider>
      <ExpoStatusBar />
    </>
  );
}
