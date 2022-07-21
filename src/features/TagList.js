import { useContext } from "react";
import { FlatList, Text } from "react-native";
import {
  TagsContainer,
  TagssText,
  TagsView,
} from "../infrastructure/commonStyles";
import { SessionContext } from "../services/array.context";
import { DashboardCard } from "./DashboardCard";

export const TagList = () => {
  const { sessions, rerender } = useContext(SessionContext);

  //   const uniqueTags = [...new Set(allTags)];

  const data = sessions;

  const occurrences = data
    .map((i) => {
      return i.tags;
    })
    .flat(1)
    .reduce((ac, a) => ((ac[a] = ac[a] + 1 || 1), ac), {});

  //   const arr = Object.keys(occurrences).map((key) => {
  //     return { key: key, ...occurrences[key] };
  //   });

  const arr = [
    Object.entries(occurrences).map(([key, value]) => {
      return { count: value, tag: key, ...occurrences[key] };
    }),
  ].flat(2);

  const sortedArray = arr.sort((a, b) => b.count - a.count).slice(0, 10);

  console.log(arr);

  const Item = ({ tag, count }) => (
    <>
      <TagsView>
        <TagssText> {tag} </TagssText>
      </TagsView>
      <Text> x{count} </Text>
    </>
  );

  const renderItem = ({ item }) => <Item tag={item.tag} count={item.count} />;

  return (
    <DashboardCard>
      <TagsContainer>
        <FlatList
          data={sortedArray}
          keyExtractor={(item) => item.tav}
          renderItem={renderItem}
        />
      </TagsContainer>
    </DashboardCard>
  );
};
