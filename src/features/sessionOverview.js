import { useState } from "react";
import { View, Text, Modal, Alert, Pressable } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { sessionTime } from "./sessionTime";
import { ConvertTime } from "./convertTime";
import { EditingModal } from "./editingModal";
import { TimeToDays } from "./timeToDays";
import {
  H1,
  H2,
  H3,
  ProjectText,
  CategoryText,
  TimeText,
  TagssText,
  BodyText,
  InputText,
  TotalTimeText,
} from "../utils/styling";
import { projects } from "../services/mock/array";

export const SessionView = (session = {}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    project = "GermErase",
    start = new Date("May 11, 2022 13:54:43"),
    end = new Date("May 11, 2022 16:32:24"),
    comment = "Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
    tags = ["social media", "admin", "meetings"],
  } = session;

  const color = projects.find((colorFind) =>
    colorFind.name.includes(project)
  )?.color;

  const ProjectCard = styled.View`
    background-color: white;
    margin: 12px;
    border-left-color: ${color};
    border-left-width: 4px;
    border-radius: 8px;
  `;

  const TimeView = styled.View`
    display: flex;
    flex-direction: row;
    background-color: #dcdcdc;
    padding: 8px;
    border-bottom-right-radius: 8px;
    align-items: center;
  `;

  const Headline = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 8px 0 8px; ;
  `;

  const TagsView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 8px 8px 8px;
  `;

  const TagsContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    flex-wrap: wrap;
  `;

  const handleChangeModalVisible = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <EditingModal changeModal={handleChangeModalVisible} />
        </Modal>
      </View>

      <ProjectCard>
        <Headline>
          <ProjectText>{project}</ProjectText>
          <TotalTimeText>
            {ConvertTime(sessionTime({ start, end }))}
          </TotalTimeText>
        </Headline>
        <TagsView>
          <TagsContainer>
            {tags?.map((i) => (
              <TagssText key={i}>#{i}</TagssText>
            ))}
          </TagsContainer>
          <TimeText>{TimeToDays(start)}</TimeText>
        </TagsView>
        <TimeView>
          <TimeText>{start.toLocaleTimeString()} </TimeText>
          <TimeText> ➞ </TimeText>
          <TimeText>{end.toLocaleTimeString()} </TimeText>
          <Pressable
            style={{ marginLeft: "auto" }}
            onPress={() => {
              Alert.alert(
                project + " session on " + start.toLocaleDateString(),
                comment,
                [
                  { text: "OK" },
                  //{ text: "Edit", onPress: () => setModalVisible(true) },
                  {
                    text: "Delete",
                    style: "cancel",
                    onPress: () =>
                      Alert.alert(
                        "Are you sure you want to delete this session entry?",
                        "",
                        [{ text: "Delete" }, { text: "Go back" }]
                      ),
                  },
                ]
              );
            }}
          >
            <Ionicons name={"information-circle"} size={24} color={color} />
          </Pressable>
        </TimeView>
      </ProjectCard>
    </>
  );
};
