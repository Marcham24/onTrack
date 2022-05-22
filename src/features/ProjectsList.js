import { useState, useContext } from "react";
import { View, FlatList, Button } from "react-native";
import { Logo } from "./logo";
import { projects } from "../services/mock/array";
import { ProjectCard } from "./ProjectCard";
import { H2 } from "../infrastructure/commonStyles";
import { SessionContext } from "../services/array.context";
import { scale } from "../infrastructure/scale";

export const ViewProjects = () => {
  const { rerender } = useContext(SessionContext);
  const renderItem = ({ item }) => (
    <Item name={item.name} category={item.category} color={item.color} />
  );

  const Item = ({ name, color, category }) => (
    <ProjectCard
      project={name}
      category={category}
      color={color}
      size={scale(160)}
      full={true}
      creation={false}
    />
  );

  return (
    <View>
      <H2>Your projects</H2>
      <FlatList
        horizontal={true}
        data={projects.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.color}
        renderItem={renderItem}
        extraData={rerender}
      />
    </View>
  );
};
