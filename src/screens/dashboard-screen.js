import { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { PeriodTime } from "../features/PeriodTime";
import { V, TimePeriod } from "../infrastructure/commonStyles";
import { ProjectPie } from "../features/ProjectPie";
import { ViewProjects } from "../features/ProjectsList";
import { DashboardCard } from "../features/DashboardCard";
import { DashboardHeader } from "../features/DashboardHeader";
import { ProjectChart } from "../features/ProjectChart";
import { findColor } from "../functions/findColor";

export const DashboardScreen = ({ project }) => {
  const [timePeriod, setTimePeriod] = useState(30);

  const isLoading = false;

  const handleChangeTimePeriod = (time) => {
    setTimePeriod(time);
  };

  const [scrollY] = useState(new Animated.Value(0));

  return (
    <>
      <V row pt={4} pb={4} bg={"c5"} j={"sa"} ai={"c"} shadow>
        <TouchableOpacity
          onPress={() => {
            handleChangeTimePeriod(1);
          }}
        >
          <TimePeriod>Today</TimePeriod>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleChangeTimePeriod(7);
          }}
        >
          <TimePeriod>7 days</TimePeriod>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleChangeTimePeriod(30);
          }}
        >
          <TimePeriod>30 days</TimePeriod>
        </TouchableOpacity>
      </V>

      <ScrollView
        nestedScrollEnabled={true}
        bounces={false}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        overScrollMode={"never"}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            listener: (event) => {},
            useNativeDriver: false,
          }
        )}
      >
        <DashboardHeader animatedValue={scrollY} />
        {isLoading ? (
          <V grow f={1} ai="c" pt={8}>
            <ActivityIndicator
              color={findColor(project) || "black"}
              size="large"
            />
          </V>
        ) : (
          <V p={2} z={5}>
            <V row>
              <ProjectPie timePeriod={timePeriod} />
              <PeriodTime calcDays={timePeriod} />
            </V>
            <>
              <ProjectChart timePeriod={timePeriod} />

              <DashboardCard>
                <ViewProjects />
              </DashboardCard>
            </>
          </V>
        )}
      </ScrollView>
    </>
  );
};
