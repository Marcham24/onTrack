import { Logo } from "./Logo";
import styled from "styled-components/native";
import { ProjectText, CategoryText } from "../infrastructure/commonStyles";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "../infrastructure/scale";
import { useNavigation } from "@react-navigation/native";

export const ProjectCard = ({
  project,
  category,
  color,
  size,
  full,
  creation = false,
}) => {
  const creationBackground = color + "66";

  const navigation = useNavigation();

  const Card = styled.View`
    padding: ${(props) => scale(props.theme.space[1]) + "px"};
    border-radius: 10px;
  `;

  return (
    <Card>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("Project Dashboard", { project: project })
        }
      >
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
              <View>
                <ProjectText>{!project ? "Project name" : project}</ProjectText>
                <CategoryText>
                  {!category || category === "Please select a category"
                    ? "Category"
                    : "Category: " + category}
                </CategoryText>
              </View>
              <View>
                <Ionicons
                  name={"arrow-forward"}
                  size={scale(25)}
                  color={"black"}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
