import { useState, useContext } from "react";
import { SessionContext } from "../services/array.context";
import { View, Alert, Text } from "react-native";
import styled from "styled-components/native";
import { Input } from "../infrastructure/commonStyles";
import { Btn } from "./Btn";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TagsHandler } from "./TagHandler";
import { sessions } from "../services/mock/array";
import { scale } from "../infrastructure/scale";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Readable } from "./ReadableDateTime";

export const EditingModal = ({
  changeProjectEditable,
  changeCancelProjectEditable,
  deleteSession,
  project,
  start,
  end,
  comment,
  tags = [],
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

    console.log(sessions[indexOfSession]);

    sessions[indexOfSession].project = project;
    sessions[indexOfSession].start = tempStart;
    sessions[indexOfSession].end = tempEnd;
    sessions[indexOfSession].comment = tempComment;
    sessions[indexOfSession].tags = tempTags;

    console.log(sessions[indexOfSession]);

    setRerender(rerender + 1);
  };

  const handleCancelUpdate = () => {
    changeCancelProjectEditable();
    setTempStart(start);
    setTempEnd(end);
    setTempComment(comment);
    setTempTags(tags);
    console.log(tags);
  };

  const handleStartConfirm = (startTime) => {
    setStartPickerOpen(false);
    setTempStart(startTime);
  };

  const handleEndConfirm = (endTime) => {
    setEndPickerOpen(false);
    setTempEnd(endTime);
  };

  return (
    <View>
      <View>
        <Btn
          mimicInput={true}
          type={"none"}
          title={Readable(tempStart)}
          onPress={projectEditable ? () => setStartPickerOpen(true) : null}
        />
        <DateTimePickerModal
          date={tempStart}
          isVisible={startPickerOpen}
          mode="datetime"
          onConfirm={handleStartConfirm}
          onCancel={() => setStartPickerOpen(false)}
        />

        <Btn
          mimicInput={true}
          type={"none"}
          title={Readable(tempEnd)}
          onPress={projectEditable ? () => setEndPickerOpen(true) : null}
        />
        <DateTimePickerModal
          date={tempEnd}
          isVisible={endPickerOpen}
          mode="datetime"
          onConfirm={handleEndConfirm}
          onCancel={() => setEndPickerOpen(false)}
        />
      </View>
      <Input
        value={tempComment}
        placeholder="No comment for this session."
        onChangeText={(value) => setTempComment(value)}
        editable={projectEditable ? true : false}
        multiline={true}
      />
      <TagsHandler
        tags={tempTags}
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
