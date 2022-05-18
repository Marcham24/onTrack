import { Logo } from "./logo";
import styled from "styled-components/native";
import { ProjectText, CategoryText } from "../utils/styling";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TotalAllTime } from "./totalAllTime";

export const ProjectCard = ({
  project,
  category,
  color,
  size,
  full,
  creation = false,
}) => {
  const creationBackground = color + "40";

  const Card = styled.View`
    align-items: center;
    padding: ${creation ? "20px" : "10px 5px"};
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
            <View style={{ padding: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ProjectText style={{ color: "black" }}>
                  {!project ? "Project name" : project}
                </ProjectText>
                <Ionicons
                  name={"ellipsis-horizontal"}
                  size={24}
                  color="#1c1d23"
                />
              </View>
              <View>
                <TotalAllTime project={project} projectSpecific={true} />
              </View>

              <TouchableOpacity>
                <CategoryText style={{ color: "grey" }}>
                  {!category || category === "Please select a category"
                    ? "Category"
                    : category}
                </CategoryText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};
