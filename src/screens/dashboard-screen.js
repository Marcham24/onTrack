import { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, Animated } from "react-native";
import { PeriodTime } from "../features/PeriodTime";
import { V, TimePeriod, H3 } from "../infrastructure/commonStyles";
import { ProjectPie } from "../features/ProjectPie";
import { ViewProjects } from "../features/ProjectsList";
import { DashboardHeader } from "../features/DashboardHeader";
import { ProjectChart } from "../features/ProjectChart";
import { DashboardAddButton } from "../features/DashboardAddButton";
import { DashboardSessions } from "../features/DashboardSessions";
import { TagList } from "../features/TagList";
import { H2 } from "../infrastructure/commonStyles";
import { Btn } from "../infrastructure/Btn";
import { findColor } from "../functions/findColor";

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
    }, 1000);
  };

  const [scrollY] = useState(new Animated.Value(0));

  const sessionsExist = true;

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
        {sessionsExist ? (
          <V p={3} j="c" ai="c">
            <H2>No sessions for this time period</H2>
            <V p={3} j="c" ai="c">
              <H3>Add one below:</H3>
            </V>
            <V row>
              <Btn
                project={project}
                type="add"
                title="Manual"
                onPress={() =>
                  navigation.navigate("Add a session", { project: project })
                }
              />
              <Btn type="add" title="Timed" project={project} />
            </V>
          </V>
        ) : (
          <>
            <V row>
              <ProjectPie timePeriod={timePeriod} isLoading={isLoading} />
              <PeriodTime
                calcDays={timePeriod}
                isLoading={isLoading}
                project={project}
              />
            </V>
            <ProjectChart
              timePeriod={timePeriod}
              isLoading={isLoading}
              project={project}
            />
            <DashboardSessions isLoading={isLoading} />
            <TagList
              timePeriod={timePeriod}
              isLoading={isLoading}
              project={project}
            />
          </>
        )}
        {!project && <ViewProjects isLoading={isLoading} />}
      </ScrollView>

      <DashboardAddButton project={project} />
    </>
  );
};
