import { useState } from "react";
import { View, Alert } from "react-native";
import styled from "styled-components/native";
import { Input } from "../infrastructure/commonStyles";
import { Btn } from "./Btn";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TagsHandler } from "./TagHandler";

const TagsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  flex-wrap: wrap;
  padding: 10px;
`;

export const EditingModal = ({
  changeModal,
  changeProjectEditable,
  changeCancelProjectEditable,
  deleteSession,
  project,
  start,
  end,
  comment,
  tags,
  projectEditable,
}) => {
  const [tempComment, setTempComment] = useState(comment);
  const [newComment, setNewComment] = useState(comment);

  const handleProjectEditable = () => {
    changeProjectEditable();
  };

  const handleDeleteSession = () => {
    deleteSession(start);
  };

  const handleUpdateSession = () => {
    setNewComment(tempComment);

    const updatedSessionEnter = [
      {
        project: project,
        start: newStart,
        end: newEnd,
        comment: newComment,
        tags: newTagList,
      },
    ];
    changeModal();
  };

  const handleCancelUpdate = () => {
    changeCancelProjectEditable();
  };

  return (
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
        <Ionicons name={"arrow-forward-outline"} size={30} color="#1c1d23" />
        <Input
          textAlign="center"
          value={end.toLocaleTimeString()}
          editable={false}
        />
      </View>
      <Input
        value={tempComment}
        onChangeText={(value) => setTempComment(value)}
        editable={projectEditable ? true : false}
        multiline={true}
      />
      <TagsHandler tags={tags} editable={projectEditable ? true : false} />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Btn
          title={projectEditable ? "Cancel" : "Edit"}
          type={projectEditable ? "cancel" : "edit"}
          onPress={projectEditable ? handleCancelUpdate : handleProjectEditable}
        />
        <Btn
          type={projectEditable ? "confirm" : "delete"}
          title={projectEditable ? "Save" : "Delete"}
          onPress={
            projectEditable
              ? handleUpdateSession
              : () =>
                  Alert.alert(
                    "Are you sure you want to delete this session entry?",
                    "Once deleted, you cannot get this sesson entry back.",
                    [
                      {
                        text: "Delete",
                        onPress: () => handleDeleteSession(start),
                      },

                      { text: "Go back" },
                    ]
                  )
          }
        />
      </View>
    </View>
  );
};
