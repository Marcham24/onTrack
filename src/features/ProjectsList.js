import { useState } from "react";
import { View, FlatList, Button } from "react-native";
import { Logo } from "./logo";
import { projects } from "../services/mock/array";
import { ProjectText, CategoryText, H2 } from "../utils/styling";

export const ViewProjects = () => {
  const renderItem = ({ item }) => (
    <Item name={item.name} category={item.category} color={item.color} />
  );

  const Item = ({ name, color, category }) => (
    <View style={{ padding: 8 }}>
      <View style={{ borderWidth: 1, borderRadius: 8, borderColor: "grey" }}>
        <Logo
          project={name}
          category={category}
          color={color}
          full={false}
          size={225}
        />

        <View style={{ padding: 16 }}>
          <ProjectText style={{ color: "black" }}>{name}</ProjectText>
          <CategoryText style={{ color: "grey", paddingBottom: 12 }}>
            Category: {category}
          </CategoryText>
          <Button title="View Project" color="#2d3142">
            See more
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ padding: 8 }}>
      <H2 style={{ color: "black", padding: 8 }}>Your projects</H2>
      <FlatList
        horizontal={true}
        data={projects.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};
