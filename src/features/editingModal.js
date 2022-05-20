import { useState, useContext } from "react";
import { SessionContext } from "../services/array.context";
import { View, Alert } from "react-native";
import styled from "styled-components/native";
import { Input } from "../infrastructure/commonStyles";
import { Btn } from "./Btn";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TagsHandler } from "./TagHandler";
import { sessions } from "../services/mock/array";
import { scale } from "../infrastructure/scale";
import DatePicker from "react-native-date-picker";

export const EditingModal = ({
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

  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);

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

    sessions[indexOfSession].project = project;
    sessions[indexOfSession].start = start;
    sessions[indexOfSession].end = end;
    sessions[indexOfSession].comment = tempComment;
    sessions[indexOfSession].tags = tempTags;

    setRerender(rerender + 1);
  };

  const handleCancelUpdate = () => {
    changeCancelProjectEditable();
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <>
          <Btn
            mimicInput={true}
            type={"none"}
            title={start.toLocaleTimeString()}
            onPress={projectEditable ? () => setStartPickerOpen(true) : null}
          />
          <DatePicker
            modal
            mode={"datetime"}
            open={startPickerOpen}
            date={start}
            onConfirm={(date) => {
              setStartPickerOpen(false);
              setTempStart(date);
            }}
            onCancel={() => {
              setStartPickerOpen(false);
            }}
          />
        </>
        <Ionicons
          name={"arrow-forward-outline"}
          size={scale(20)}
          color="#1c1d23"
        />
        <Btn
          mimicInput={true}
          type={"none"}
          title={end.toLocaleTimeString()}
          onPress={projectEditable ? null : null}
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
