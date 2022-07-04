import { Logo } from "./Logo";
import styled from "styled-components/native";
import { ProjectText, CategoryText } from "../infrastructure/commonStyles";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "../infrastructure/scale";

export const ProjectCard = ({
  project,
  category,
  color,
  size,
  full,
  creation = false,
}) => {
  const creationBackground = color + "66";

  const Card = styled.View`
    padding: ${(props) => scale(props.theme.space[1]) + "px"};
    border-radius: 10px;
  `;

  return (
    <Card>
      <View style={{ width: size }}>
        <View
          style={{
            borderRadius: 8,
            backgroundColor: "white",
          }}
        >
          <Logo
            project={!project ? "Project name" : project}
            category={!category ? "Category" : category}
            color={color}
            full={full}
            size={size}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
            }}
          >
            <View style={{ flexShrink: 1 }}>
              <ProjectText>{!project ? "Project name" : project}</ProjectText>
              <TouchableOpacity>
                <CategoryText>
                  {!category || category === "Please select a category"
                    ? "Category"
                    : "Category: " + category}
                </CategoryText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
