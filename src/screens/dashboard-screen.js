import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { Btn } from "../features/Btn";
import { TagsHandler } from "../features/TagHandler";
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
} from "../infrastructure/commonStyles";
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
      <View>
        <TagsHandler />
      </View>
    </SafeView>
  );
};
