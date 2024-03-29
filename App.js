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

const AddSessionScreen = (props) => {
  return <AddSession {...props} />;
};

const AddProjectScreen = () => {
  return <AddProject />;
};

const SearchScreen = () => {
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
                  options={({ navigation }) => ({
                    headerMode: "float",
                    headerTitle: "",
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: "#FFF",
                    headerTitleVisible: false,
                    headerRight: () => (
                      <V pr={3}>
                        <Ionicons
                          name="search"
                          size={scale(20)}
                          color="white"
                          onPress={() => navigation.navigate("Search")}
                        />
                      </V>
                    ),
                    headerLeft: () => null,
                  })}
                />
                <Stack.Screen
                  name="Projects"
                  component={ProjectsScreen}
                  options={{
                    headerStyle: { backgroundColor: "#353535" },
                    headerTitleStyle: { color: "#fff" },
                    headerTintColor: "#FFF",
                  }}
                />
                <Stack.Screen
                  name="Project Dashboard"
                  component={ProjectsDashboard}
                  options={({ navigation }) => ({
                    headerMode: "float",
                    headerTitle: "",
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: "#FFF",
                    headerTitleVisible: false,
                    headerRight: () => (
                      <V pr={3}>
                        <Ionicons
                          name="search"
                          size={scale(20)}
                          color="white"
                          onPress={() => navigation.navigate("Search")}
                        />
                      </V>
                    ),
                  })}
                />

                <Stack.Screen
                  name="Add a session"
                  component={AddSessionScreen}
                  options={{
                    headerStyle: { backgroundColor: "#353535" },
                    headerTitleStyle: { color: "#fff" },
                    headerTintColor: "#FFF",
                  }}
                />
                <Stack.Screen
                  name="Add a project"
                  component={AddProjectScreen}
                  options={{
                    headerStyle: { backgroundColor: "#353535" },
                    headerTitleStyle: { color: "#fff" },
                    headerTintColor: "#FFF",
                  }}
                />
                <Stack.Screen
                  name="Search"
                  component={SearchScreen}
                  options={{
                    headerStyle: { backgroundColor: "#353535" },
                    headerTitleStyle: { color: "#fff" },
                    headerTintColor: "#FFF",
                  }}
                />
              </Stack.Navigator>
            </SafeView>
          </NavigationContainer>
        </SessionContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="dark" />
    </>
  );
}
