import { useState, useContext } from "react";
import { View, Text, Modal, Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { sessionTime } from "./sessionTime";
import { ConvertTime } from "./convertTime";
import { ModalBase } from "./ModalBase";
import { EditingModal } from "./editingModal";
import { TimeToDays } from "./timeToDays";
import { Logo } from "./logo";
import {
  Input,
  ProjectText,
  TimeText,
  TagssText,
} from "../infrastructure/commonStyles";
import { projects } from "../services/mock/array";
import { SessionContext } from "../services/array.context";
import { Btn } from "./Btn";

export const SessionView = (session = {}) => {
  const { sessions, rerender, setRerender } = useContext(SessionContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [projectEditable, setProjectEditable] = useState(false);
  const [newComment, setNewComment] = useState();

  const {
    project = "GermErase",
    start = new Date("May 17, 2022 12:55:23"),
    end = new Date("May 01, 2022 16:32:24"),
    comment = "Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
    tags = ["social media", "admin", "meetings"],
  } = session;

  const color = projects.find((colorFind) =>
    colorFind.name.includes(project)
  )?.color;

  const creationBackground = color + "80";

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

  const TagsContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    flex-wrap: wrap;
    padding: 10px;
  `;
  // For editing modal - dont not delete just yet

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

  let tagsToText = "";

  tags?.map((i) => (tagsToText += i + ", "));

  tagsToText.slice(0, -1);
  return (
    <>
      <View>
        <ModalBase
          title={project + " session " + TimeToDays(start)}
          header={true}
          color={creationBackground}
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
          children={
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Input
                  textAlign="center"
                  value={start.toLocaleDateString()}
                  editable={projectEditable ? true : false}
                />
                <Input
                  textAlign="center"
                  value={start.toLocaleTimeString()}
                  editable={false}
                />
                <Ionicons
                  name={"arrow-forward-outline"}
                  size={30}
                  color="#1c1d23"
                />
                <Input
                  textAlign="center"
                  value={end.toLocaleTimeString()}
                  editable={false}
                />
              </View>
              <Input
                value={comment}
                editable={projectEditable ? true : false}
                multiline={true}
                onChangeText={() => setNewComment(newComment)}
              />
              <TagsContainer>
                {tags?.map((i) => (
                  <TagssText key={i}>#{i}</TagssText>
                ))}
              </TagsContainer>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Btn
                  title="Edit"
                  type="edit"
                  onPress={() => setProjectEditable(true)}
                />
                <Btn
                  type="delete"
                  title="Delete"
                  onPress={() =>
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
                    )
                  }
                />
              </View>
            </View>
          }
        />
      </View>

      {/* <EditingModal changeModal={handleChangeModalVisible} /> */}

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
              onPress={() => setModalVisible(true)}
              //   Alert.alert(
              //     project + " session on " + start.toLocaleDateString(),
              //     comment,
              //     [
              //       { text: "OK" },
              //       //{ text: "Edit", onPress: () => setModalVisible(true) },
              //       {
              //         text: "Delete",
              //         style: "cancel",
              //         onPress: () =>
              //           Alert.alert(
              //             "Are you sure you want to delete this session entry?",
              //             "Once deleted, you cannot get this sesson entry back.",
              //             [
              //               {
              //                 text: "Delete",
              //                 onPress: () => {
              //                   deleteSession(start), setRerender(rerender + 1);
              //                 },
              //               },
              //               { text: "Go back" },
              //             ]
              //           ),
              //       },
              //     ]
              //   );
              // }}
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
