import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { findColor } from "../functions/findColor";
import {
  TagsContainer,
  TagsText,
  TagsView,
  H2,
  H3,
  TagCount,
  TagsCountView,
} from "../infrastructure/commonStyles";
import { SessionContext } from "../services/array.context";
import { DashboardCard } from "./DashboardCard";

export const TagList = ({ isLoading, project, timePeriod }) => {
  const { sessions } = useContext(SessionContext);

  let now = new Date();

  const day = 1000 * 60 * 60 * 24;

  const periodTime = now.setHours(23, 59, 59, 0) - day * timePeriod;

  const timePeriodData = sessions.filter((date) => {
    return date.start > periodTime;
  });

  let data;

  project
    ? (data = timePeriodData.filter((el) => {
        return el.project === project;
      }))
    : (data = timePeriodData);

  const occurrences = data
    .map((i) => {
      return i.tags;
    })
    .flat(1)
    .reduce((ac, a) => ((ac[a] = ac[a] + 1 || 1), ac), {});

  const arr = [
    Object.entries(occurrences).map(([key, value]) => {
      return { count: value, tag: key.toUpperCase(), ...occurrences[key] };
    }),
  ].flat(2);

  let limit = 10;

  const sortedArray = arr.sort((a, b) => b.count - a.count).slice(0, limit);

  const color = findColor(project) || "#353535";

  const tagsList = sortedArray.map((i, v) => {
    return (
      <TagsView key={v}>
        <TagsText>{i.tag}</TagsText>
        <TagsCountView color={color}>
          <TagCount> x {i.count} </TagCount>
        </TagsCountView>
      </TagsView>
    );
  });

  return (
    <DashboardCard isLoading={isLoading}>
      <H2>Top Tags</H2>
      <TagsContainer>
        {sortedArray.length === 0 ? <H3>No tags for this period</H3> : tagsList}
      </TagsContainer>
    </DashboardCard>
  );
};
