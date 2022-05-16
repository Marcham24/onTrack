import { Logo } from "./logo";
import styled from "styled-components/native";
import { ProjectText, CategoryText } from "../utils/styling";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    padding: ${creation ? "20px" : "10px"};
    background-color: ${creation && creationBackground};
  `;

  const ButtonPrimary = styled.TouchableOpacity`
    padding: 10px;
    margin: 10px;
    background-color: #e1e1e7;
    border-radius: 5px;
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

          <View style={{ padding: 20 }}>
            <ProjectText style={{ color: "black" }}>
              {!project ? "Project name" : project}
            </ProjectText>
            <TouchableOpacity>
              <CategoryText style={{ color: "grey" }}>
                {!category || category === "Please select a category"
                  ? "Category"
                  : category}
              </CategoryText>
            </TouchableOpacity>
          </View>
          <View>
            {!creation && (
              <ButtonPrimary title="View project">
                <Text>View Project</Text>
              </ButtonPrimary>
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};
