import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useState, useContext } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TagsHandler } from "./TagHandler";
import { Input, DropdownStyled } from "../infrastructure/commonStyles";
import { Btn } from "../infrastructure/Btn";
import { ProjectCard } from "./ProjectCard";
import { SessionContext } from "../services/array.context";
import { projects } from "../services/mock/array";
import { scale } from "../infrastructure/scale";
import { Readable } from "../functions/readableDateTime";
import { SessionView } from "./SessionOverview";
import { findColor } from "../functions/findColor";

export const AddSession = () => {
  const { sessions, rerender, setRerender } = useContext(SessionContext);

  const now = new Date();

  const [newProject, setNewProject] = useState("Project");
  const [newStart, setNewStart] = useState(now);
  const [newEnd, setNewEnd] = useState(now);
  const [newComment, setNewComment] = useState("");
  const [newTags, setNewTags] = useState([]);
  const [projectColor, setProjectColor] = useState("#000000");

  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);

  const handleStartConfirm = (startTime) => {
    setStartPickerOpen(false);
    setNewStart(startTime);
  };

  const handleEndConfirm = (endTime) => {
    setEndPickerOpen(false);
    setNewEnd(endTime);
  };

  const creationBackground = projectColor + "66";

  const handleAddSession = () => {
    const newSessionEntry = {
      project: newProject,
      start: newStart,
      end: newEnd,
      comment: newComment,
      tags: newTags,
    };

    sessions.push(newSessionEntry);

    setNewProject("Project");
    setNewStart(now);
    setNewEnd(now);
    setNewComment("");
    setNewTags([]);
    setProjectColor("#000000");
    Keyboard.dismiss();
    setRerender(rerender + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: creationBackground,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <SessionView
          project={newProject}
          start={newStart}
          end={newEnd}
          creation={true}
        />
      </View>

      <View style={!newProject && { flexGrow: 1, justifyContent: "center" }}>
        <DropdownStyled
          maxHeight={scale(200)}
          placeholder="Select a project"
          value={newProject}
          data={projects}
          labelField="name"
          valueField="name"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          onChange={(item) => {
            setNewProject(item.name);
            setProjectColor(findColor(item.name));
          }}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1.5 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={65}
      >
        <ScrollView style={{ flex: 2 }} keyboardShouldPersistTaps="always">
          <View>
            <View>
              <Btn
                mimicInput={true}
                type={"none"}
                title={newStart ? Readable(newStart) : "Add a start time"}
                onPress={() => setStartPickerOpen(true)}
              />
              <DateTimePickerModal
                date={newStart}
                isVisible={startPickerOpen}
                mode="datetime"
                onConfirm={handleStartConfirm}
                onCancel={() => setStartPickerOpen(false)}
              />

              <Btn
                mimicInput={true}
                type={"none"}
                title={newEnd ? Readable(newEnd) : "Add a end time"}
                onPress={() => setEndPickerOpen(true)}
              />
              <DateTimePickerModal
                date={newEnd}
                isVisible={endPickerOpen}
                mode="datetime"
                onConfirm={handleEndConfirm}
                onCancel={() => setEndPickerOpen(false)}
              />
            </View>
            <Input
              placeholder="Please enter your new comment for this session"
              value={newComment}
              onChangeText={(value) => setNewComment(value)}
              editable={true}
              multiline={true}
            />
            <TagsHandler
              tags={newTags}
              editable={true}
              passNewTags={setNewTags}
            />
          </View>
        </ScrollView>

        <View style={{ flexShrink: 1 }}>
          <Btn
            title="Add session"
            color="white"
            type="add"
            onPress={() => handleAddSession()}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: scale(11),
  },
  selectedTextStyle: {
    fontSize: scale(11),
  },
});
