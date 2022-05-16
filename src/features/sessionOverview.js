import { useState, useContext } from "react";
import { View, Text, Modal, Alert, TouchableOpacity } from "react-native";
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
import { SessionContext } from "../services/array.context";

export const SessionView = (session = {}) => {
  const { sessions, rerender, setRerender } = useContext(SessionContext);

  const [modalVisible, setModalVisible] = useState(false);
  const {
    project = "GermErase",
    start = new Date("May 01, 2022 12:55:23"),
    end = new Date("May 01, 2022 16:32:24"),
    comment = "Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
    tags = ["social media", "admin", "meetings"],
  } = session;

  const color = projects.find((colorFind) =>
    colorFind.name.includes(project)
  )?.color;

  const creationBackground = color + "B3";

  const ProjectCard = styled.View`
    background-color: white;
    margin: 10px;
    border-left-color: ${creationBackground};
    border-left-width: 5px;
    border-radius: 10px;
  `;

  const TimeView = styled.View`
    display: flex;
    flex-direction: row;
    background-color: #e1e1e7;
    padding: 5px 15px;
    border-bottom-right-radius: 10px;
    align-items: center;
  `;

  const Headline = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 15px 0 15px; ;
  `;

  const TagsView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px 15px 15px;
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

  const deleteSession = (startTime) => {
    const indexOfSession = sessions.findIndex(
      (find) => find.start.getTime() === startTime.getTime()
    );

    sessions.splice(indexOfSession, 1);

    setRerender(rerender + 1);
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
          <TouchableOpacity
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
                        "Once deleted, you cannot get this sesson entry back.",
                        [
                          {
                            text: "Delete",
                            onPress: () => {
                              deleteSession(start), setRerender(rerender + 1);
                            },
                          },
                          { text: "Go back" },
                        ]
                      ),
                  },
                ]
              );
            }}
          >
            <Ionicons name={"ellipsis-horizontal"} size={24} color="#1c1d23" />
          </TouchableOpacity>
        </TimeView>
      </ProjectCard>
    </>
  );
};
