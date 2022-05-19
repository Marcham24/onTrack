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
  ProjectText,
  TimeText,
  SessionCard,
  SessionCardText,
} from "../infrastructure/commonStyles";
import { projects } from "../services/mock/array";
import { SessionContext } from "../services/array.context";

export const SessionView = (session = {}) => {
  const { sessions, rerender, setRerender } = useContext(SessionContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [projectEditable, setProjectEditable] = useState(false);
  const [tempComment, setTempComment] = useState(comment);
  const [newComment, setNewComment] = useState(comment);

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

  const handleChangeModalVisible = () => {
    setModalVisible(false);
  };

  const handleProjectEditable = () => {
    setProjectEditable(true);
  };

  const handleCancelProjectEditable = () => {
    setProjectEditable(false);
  };

  const handleDeleteSession = (startTime) => {
    const indexOfSession = sessions.findIndex(
      (find) => find.start.getTime() === startTime.getTime()
    );
    sessions.splice(indexOfSession, 1);
    setRerender(rerender + 1);
  };

  return (
    <>
      <ModalBase
        title={project + " session " + TimeToDays(start)}
        header={true}
        color={creationBackground}
        modalVisible={modalVisible}
        changeModal
        setModalVisible={() =>
          setModalVisible(!modalVisible) + setProjectEditable(false)
        }
        children={
          <EditingModal
            project={project}
            start={start}
            end={end}
            comment={comment}
            tags={tags}
            projectEditable={projectEditable}
            changeModal={handleChangeModalVisible}
            changeProjectEditable={handleProjectEditable}
            changeCancelProjectEditable={handleCancelProjectEditable}
            deleteSession={handleDeleteSession}
          />
        }
      />
      <SessionCard>
        <View>
          <Logo project={project} color={color} full={false} size={50} />
        </View>
        <SessionCardText>
          <View>
            <ProjectText>
              {project + " - " + ConvertTime(sessionTime({ start, end }))}
            </ProjectText>
            <TimeText>{TimeToDays(start)}</TimeText>
          </View>
          <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name={"ellipsis-vertical"} size={24} color="#1c1d23" />
            </TouchableOpacity>
          </View>
        </SessionCardText>
      </SessionCard>
    </>
  );
};
