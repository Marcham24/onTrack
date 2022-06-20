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
import { ProjectText, TimeText } from "../infrastructure/commonStyles";
import { projects } from "../services/mock/array";
import { SessionContext } from "../services/array.context";
import { scale } from "../infrastructure/scale";

export const SessionView = ({
  project,
  start,
  end,
  comment,
  tags,
  creation = false,
}) => {
  const { sessions, rerender, setRerender } = useContext(SessionContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [projectEditable, setProjectEditable] = useState(false);

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
      (find) => find.start === startTime
    );
    sessions.splice(indexOfSession, 1);
    setRerender(rerender + 1);
  };

  const SessionCard = styled.View`
    background-color: ${(props) => props.theme.colors.white};
    margin: ${(props) => scale(props.theme.space[0]) + "px"} ${(props) =>
    scale(props.theme.space[1]) + "px"}
    border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
    padding: ${(props) => scale(props.theme.space[1]) + "px"};
    flex-direction: row;
    align-content: center;
    border-width: 1px;
    border-color: ${(props) => props.theme.colors.c5};
    
  `;

  const SessionCardText = styled.View`
    padding-left: ${(props) => scale(props.theme.space[2]) + "px"};
    flex: 1;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  `;

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
      <TouchableOpacity
        onPress={!creation ? () => setModalVisible(true) : null}
      >
        <SessionCard>
          <View>
            <Logo
              project={project}
              color={color}
              full={false}
              size={scale(40)}
            />
          </View>
          <SessionCardText>
            <View>
              <ProjectText>
                {project + " - " + ConvertTime(sessionTime({ start, end }))}
              </ProjectText>
              <TimeText>{TimeToDays(start)}</TimeText>
            </View>
            <View>
              <Ionicons
                name={"arrow-forward-outline"}
                size={scale(16)}
                color="#1c1d23"
              />
            </View>
          </SessionCardText>
        </SessionCard>
      </TouchableOpacity>
    </>
  );
};
