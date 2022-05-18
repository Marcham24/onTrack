import { useState, useContext } from "react";
import { View, Text, Modal, Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { sessionTime } from "./sessionTime";
import { ConvertTime } from "./convertTime";
import { EditingModal } from "./editingModal";
import { TimeToDays } from "./timeToDays";
import { Logo } from "./logo";
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
    margin: 5px 10px;
    border-radius: 5px;
    padding: 10px;
    flex-direction: row;
    align-content: center;
    border-width: 1px;
    border-color: #dedede;
  `;

  const TimeView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const Headline = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const TagsView = styled.View`
    display: flex;
    flex-direction: row;
    background-color: #dedede;
    padding: 4px 8px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    align-items: center;
  `;

  const TagsContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    flex-wrap: wrap;
    background-color: red;
  `;

  const TimeContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    flex-wrap: wrap;
    align-items: center;
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
        <View>
          <Logo project={project} color={color} full={false} size={50} />
        </View>
        <View
          style={{
            alignItems: "center",
            paddingLeft: 10,
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <ProjectText>
              {project + " - " + ConvertTime(sessionTime({ start, end }))}
            </ProjectText>
            <TimeText>{TimeToDays(start)}</TimeText>
          </View>
          <View>
            <TouchableOpacity
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
              <Ionicons name={"ellipsis-vertical"} size={24} color="#1c1d23" />
            </TouchableOpacity>
          </View>
        </View>
        <TimeView>
          {/* <TimeContainer>
            <Ionicons name={"timer-outline"} size={14} color="#1c1d23" />
            <TimeText>{start.toLocaleTimeString()}</TimeText>
            <Ionicons
              name={"arrow-forward-outline"}
              size={10}
              color="#1c1d23"
            />
            <TimeText>{end.toLocaleTimeString()}</TimeText>
          </TimeContainer> */}

          {/* <TimeText>{TimeToDays(start)}</TimeText> */}
        </TimeView>

        {/* <TagsView>
          <TagsContainer>
            {tags?.map((i) => (
              <TagssText key={i}>#{i}</TagssText>
            ))}
          </TagsContainer>
          
        </TagsView> */}
      </ProjectCard>
    </>
  );
};
