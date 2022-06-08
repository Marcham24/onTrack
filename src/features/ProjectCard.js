import { Logo } from "./logo";
import styled from "styled-components/native";
import { ProjectText, CategoryText } from "../infrastructure/commonStyles";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TotalAllTime } from "./totalAllTime";
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
  `;

  return (
    <Card>
      <View style={{ width: size }}>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}
        >
          <Logo
            project={!project ? "Project name" : project}
            category={!category ? "Category" : category}
            color={color}
            full={full}
            size={size}
          />

          {!creation && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
              }}
            >
              <View>
                <ProjectText>{!project ? "Project name" : project}</ProjectText>
                <TouchableOpacity>
                  <CategoryText>
                    {!category || category === "Please select a category"
                      ? "Category"
                      : "Category: " + category}
                  </CategoryText>
                </TouchableOpacity>
              </View>
              <View style={{ flexShrink: 0 }}>
                <TouchableOpacity>
                  <Ionicons
                    name={"ellipsis-vertical"}
                    size={scale(16)}
                    color="#1c1d23"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};
