import { useContext } from "react";
import { View, FlatList } from "react-native";
import { SessionContext } from "../services/array.context";
import { H3 } from "../infrastructure/commonStyles";
import { SessionView } from "./sessionOverview";

export const SessionList = ({
  data,
  emptyListString = "No data available",
  horizontal = false,
  inverse = false,
}) => {
  const { rerender } = useContext(SessionContext);

  const renderItem = ({ item }) => (
    <Item
      project={item.project}
      start={item.start}
      end={item.end}
      comment={item.comment}
      tags={item.tags}
    />
  );

  const Item = ({ project, start, end, comment, tags }) => (
    <View>
      <SessionView
        project={project}
        start={start}
        end={end}
        comment={comment}
        tags={tags}
        creation={false}
        inverse={inverse}
      />
    </View>
  );

  const keyExtractor = (item) => item.start;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
      keyboardShouldPersistTaps="always"
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      extraData={rerender}
      initialNumToRender={10}
      ListEmptyComponent={<H3>{emptyListString}</H3>}
    />
  );
};
