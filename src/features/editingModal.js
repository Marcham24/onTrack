import { useState, useContext } from "react";
import { SessionContext } from "../services/array.context";
import { View, Alert } from "react-native";
import styled from "styled-components/native";
import { Input } from "../infrastructure/commonStyles";
import { Btn } from "./Btn";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TagsHandler } from "./TagHandler";
import { sessions } from "../services/mock/array";

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
  const { rerender, setRerender } = useContext(SessionContext);
  const [tempStart, setTempStart] = useState(start);
  const [tempEnd, setTempEnd] = useState(end);
  const [tempComment, setTempComment] = useState(comment);
  const [tempTags, setTempTags] = useState(tags);

  const handleProjectEditable = () => {
    changeProjectEditable();
  };

  const handleDeleteSession = () => {
    deleteSession(start);
  };

  const handleUpdateSession = (startTime) => {
    const indexOfSession = sessions.findIndex(
      (find) => find.start.getTime() === startTime.getTime()
    );

    console.log(indexOfSession);

    const updatedSessionEntry = [
      {
        project: project,
        start: start,
        end: end,
        comment: tempComment,
        tags: tempTags,
      },
    ];

    sessions[indexOfSession] = updatedSessionEntry;

    console.log(sessions[indexOfSession]);

    setRerender(rerender + 1);
  };

  const handleCancelUpdate = () => {
    console.log(tempTags);
    console.log(tempComment);

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
      <TagsHandler
        tags={tags}
        editable={projectEditable ? true : false}
        passNewTags={setTempTags}
      />

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
              ? () => handleUpdateSession(start)
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
