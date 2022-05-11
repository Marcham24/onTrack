import { useState } from "react";
import { View, Text, Modal, Alert, Pressable } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { sessionTime } from "./sessionTime";
import { ConvertTime } from "./convertTime";
import { EditingModal } from "./editingModal";

export const SessionView = (session = {}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    project = "GermErase",
    start = new Date("May 07, 2022 13:54:43"),
    end = new Date("May 07, 2022 16:32:24"),
    comment = "Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
    tags = ["test", "items"],
  } = session;

  const TEST = (size) => {
    return 4 * size + "px";
  };

  const H3 = styled.Text`
    font-size: ${TEST(3)};
  `;

  const ProjectCard = styled.View`
    margin: 10px;
    border-color: #393e46;
    border-width: 1px;
    border-left-width: 5px;
    border-radius: 8px;
  `;

  const TimeView = styled.View`
    display: flex;
    flex-direction: row;
    background-color: #eeeeee;
    padding: 10px;
    border-radius: 8px;
  `;

  const PrimaryView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
  `;

  const TagsView = styled.View`
    display: flex;
    flex-direction: row;
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
        <PrimaryView>
          <View>
            <H3>
              {project} - {ConvertTime(sessionTime({ start, end }))}
            </H3>
            <TagsView>
              {tags?.map((i) => (
                <Text key={i}>#{i} </Text>
              ))}
            </TagsView>
          </View>
          <View>
            <Pressable
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
              <Ionicons name={"information-circle-outline"} size={25} />
            </Pressable>
            <Text>{start.toLocaleDateString()} </Text>
          </View>
        </PrimaryView>
        <TimeView>
          <Text>{start.toLocaleTimeString()} </Text>
          <Ionicons name={"arrow-forward"} size={16} />
          <Text>{end.toLocaleTimeString()} </Text>
        </TimeView>
      </ProjectCard>
    </>
  );
};
