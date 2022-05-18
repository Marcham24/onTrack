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
import { theme } from "./src/infrastructure/theme/index";
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
  useFonts as useInter,
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import {
  useFonts as useRoboto,
  Roboto_300Light,
} from "@expo-google-fonts/inter";
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
  Input,
} from "./src/utils/styling";
import { Btn } from "./src/features/Btn";
import { TextInput } from "react-native-paper";
import { ModalBase } from "./src/features/ModalBase";

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
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View>
        <Btn color="#EF8354" onPress={() => setModalVisible(true)} />
      </View>
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

  const [interLoaded] = useInter({
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
  });

  // if (!robotoLoaded || !robotoCondensedLoaded || !interLoaded) {
  //   return null;
  // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <SessionContextProvider>
          <NavigationContainer style={{ backgroundColor: "black" }}>
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
