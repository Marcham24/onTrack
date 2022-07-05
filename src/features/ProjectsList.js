import { useState, useContext } from "react";
import { View, FlatList, Button } from "react-native";
import { projects } from "../services/mock/array";
import { ProjectCard } from "./ProjectCard";
import { H2 } from "../infrastructure/commonStyles";
import { SessionContext } from "../services/array.context";
import { scale } from "../infrastructure/scale";
import { DashboardCard } from "./DashboardCard";

export const ViewProjects = ({ isLoading }) => {
  const { rerender } = useContext(SessionContext);
  const renderItem = ({ item }) => (
    <Item name={item.name} category={item.category} color={item.color} />
  );

  const Item = ({ name, color, category }) => (
    <ProjectCard
      project={name}
      category={category}
      color={color}
      size={scale(200)}
      full={true}
      creation={false}
      style={{ alignItems: "stretch" }}
    />
  );

  const data = projects.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <DashboardCard backgroundColor={"#353535"} isLoading={isLoading}>
      <H2 style={{ color: "white", paddingBottom: 10 }}>Your Projects</H2>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item) => item.color}
        renderItem={renderItem}
        extraData={rerender}
      />
    </DashboardCard>
  );
};
