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
import { DashboardAddButton } from "../features/DashboardAddButton";
import { Loading, LoadingIndicator } from "../features/Loading";

export const DashboardScreen = ({ project }) => {
  const [timePeriod, setTimePeriod] = useState(30);
  const [loading, setLoading] = useState(false);

  const handleChangeTimePeriod = (time) => {
    setLoading(!loading);
    setTimeout(() => {
      setTimePeriod(time);
    }, 2000);
    setTimeout(() => {
      setLoading(!loading);
    }, 4000);
  };

  const [scrollY] = useState(new Animated.Value(0));

  return (
    <>
      <V>
        <V row bg={"c5"}>
          <V row grow f={5} pt={4} pb={4} j={"sa"} ai={"c"}>
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
          <DashboardHeader animatedValue={scrollY} project={"join"} />
          <V p={2}>
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
        </ScrollView>
      </V>
      <DashboardAddButton project={project} />
      <LoadingIndicator isLoading={loading} />
    </>
  );
};
