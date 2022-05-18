import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { H1 } from "../infrastructure/commonStyles";
export const DashboardScreen = () => {
  return (
    <SafeView>
      <View>
        <H1>Hello World</H1>
      </View>
      <View>
        <TotalAllTime />
      </View>
      <View>
        <PeriodTime calcDays={7} />
        <PeriodTime calcDays={30} />
      </View>
    </SafeView>
  );
};
