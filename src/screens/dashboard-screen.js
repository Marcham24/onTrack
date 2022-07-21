import { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Animated } from "react-native";
import { PeriodTime } from "../features/PeriodTime";
import { V, TimePeriod } from "../infrastructure/commonStyles";
import { ProjectPie } from "../features/ProjectPie";
import { ViewProjects } from "../features/ProjectsList";
import { DashboardHeader } from "../features/DashboardHeader";
import { ProjectChart } from "../features/ProjectChart";
import { DashboardAddButton } from "../features/DashboardAddButton";
import { DashboardSessions } from "../features/DashboardSessions";
import { TagList } from "../features/TagList";

export const DashboardScreen = ({ navigation, route }) => {
  const [timePeriod, setTimePeriod] = useState(7);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const project = route.params?.project;

  const handleChangeTimePeriod = (time) => {
    setTimePeriod(time);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const [scrollY] = useState(new Animated.Value(0));

  return (
    <>
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
        <DashboardHeader
          animatedValue={scrollY}
          project={project}
          handler={handleChangeTimePeriod}
          timePeriod={timePeriod}
        />
        <V row>
          <ProjectPie timePeriod={timePeriod} isLoading={isLoading} />
          <PeriodTime
            calcDays={timePeriod}
            isLoading={isLoading}
            project={project}
          />
        </V>
        <TagList />
        <ProjectChart
          timePeriod={timePeriod}
          isLoading={isLoading}
          project={project}
        />

        <DashboardSessions isLoading={isLoading} />
        <ViewProjects isLoading={isLoading} />
      </ScrollView>

      <DashboardAddButton project={project} />
    </>
  );
};
