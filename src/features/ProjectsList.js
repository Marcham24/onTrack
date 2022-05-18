import { useState } from "react";
import { View, FlatList, Button } from "react-native";
import { Logo } from "./logo";
import { projects } from "../services/mock/array";
import { ProjectCard } from "./ProjectCard";
import { H2 } from "../infrastructure/commonStyles";

export const ViewProjects = () => {
  const renderItem = ({ item }) => (
    <Item name={item.name} category={item.category} color={item.color} />
  );

  const Item = ({ name, color, category }) => (
    <ProjectCard
      project={name}
      category={category}
      color={color}
      size={240}
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
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};
