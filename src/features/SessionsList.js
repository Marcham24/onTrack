import { useState, useContext } from "react";
import { View, FlatList, Button } from "react-native";
import { Logo } from "./logo";
import { SessionContext } from "../services/array.context";
import { ProjectText, CategoryText, H2 } from "../utils/styling";
import { SessionView } from "../features/sessionOverview";

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
      <H2 style={{ color: "black", padding: 8 }}>Your projects</H2>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={rerender}
      />
    </View>
  );
};