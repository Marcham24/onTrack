import { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Animated } from "react-native";
import { PeriodTime } from "../features/PeriodTime";
import { V, TimePeriod } from "../infrastructure/commonStyles";
import { ProjectPie } from "../features/ProjectPie";
import { ViewProjects } from "../features/ProjectsList";
import { DashboardCard } from "../features/DashboardCard";
import { DashboardHeader } from "../features/DashboardHeader";
import { ProjectChart } from "../features/ProjectChart";
import { DashboardAddButton } from "../features/DashboardAddButton";
import { DashboardSessions } from "../features/DashboardSessions";

export const DashboardScreen = ({ project }) => {
  const [timePeriod, setTimePeriod] = useState(7);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleChangeTimePeriod(7);
  }, []);

  const handleChangeTimePeriod = (time) => {
    setIsLoading(true);
    setTimePeriod(time);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const [scrollY] = useState(new Animated.Value(0));

  return (
    <>
      <V row bg={"c5"}>
        <V row grow pt={4} pb={4} j={"sa"} ai={"c"}>
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
        <DashboardHeader animatedValue={scrollY} />
        <V row>
          <ProjectPie timePeriod={timePeriod} isLoading={isLoading} />
          <PeriodTime calcDays={timePeriod} isLoading={isLoading} />
        </V>
        <ViewProjects isLoading={isLoading} />
        <ProjectChart timePeriod={timePeriod} isLoading={isLoading} />

        <DashboardSessions isLoading={isLoading} />
      </ScrollView>

      <DashboardAddButton />
    </>
  );
};
