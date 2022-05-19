import { useState, useContext } from "react";
import { View, FlatList, Button } from "react-native";
import { Logo } from "./logo";
import { SessionContext } from "../services/array.context";
import { H2 } from "../infrastructure/commonStyles";
import { SessionView } from "../features/sessionOverview";
import { getCurrentTimestamp } from "react-native/Libraries/Utilities/createPerformanceLogger";

export const ViewSessions = () => {
  const { sessions, rerender } = useContext(SessionContext);

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
      />
    </View>
  );

  return (
    <View>
      <H2>Your recent sessions</H2>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={sessions.sort((a, b) => b.start - a.start)}
        keyExtractor={(item) => item.start}
        renderItem={renderItem}
        extraData={rerender}
      />
    </View>
  );
};
