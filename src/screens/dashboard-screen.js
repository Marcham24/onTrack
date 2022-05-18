import { SafeView } from "../components/safeView";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import { PeriodTime } from "../features/periodTime";
import { TotalAllTime } from "../features/totalAllTime";
import { scale } from "../infrastructure/scale";
import { Btn } from "../features/Btn";
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
        <H1>Hello World!</H1>
        <H2>Hello World!</H2>
        <H3>Hello World!</H3>
        <ProjectText>GermErase</ProjectText>
        <TotalTimeText>Hello World!</TotalTimeText>
        <CategoryText>Hello World!</CategoryText>
        <TimeText>Hello World!</TimeText>
        <View style={{ flexDirection: "row" }}>
          <TagssText>Hello World!</TagssText>
          <TagssText>Hello World!</TagssText>
          <TagssText>Hello World!</TagssText>
        </View>

        <BodyText>Hello World!</BodyText>
        <Input>Hello World!</Input>
        <Btn title="Hello World!" />
        <Btn title="Hello World!" type="delete" />
        <Btn title="Hello World!" type="edit" />
        <Btn title="Hello World!" type="back" />
      </View>
    </SafeView>
  );
};
