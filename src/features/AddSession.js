import { ScrollView, View, Text } from "react-native";
import { useState, useContext } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TagsHandler } from "./TagHandler";
import { Input } from "../infrastructure/commonStyles";
import { Btn } from "./Btn";
import { ProjectCard } from "./ProjectCard";
import { SessionContext } from "../services/array.context";
import { projects } from "../services/mock/array";
import { scale } from "../infrastructure/scale";
import { Readable } from "./ReadableDateTime";
import { SessionView } from "./sessionOverview";

export const AddSession = () => {
  const { sessions, rerender, setRerender } = useContext(SessionContext);

  const now = new Date();

  const [newProject, setNewProject] = useState("GermErase");
  const [newStart, setNewStart] = useState(now);
  const [newEnd, setNewEnd] = useState(now);
  const [newComment, setNewComment] = useState("");
  const [newTags, setNewTags] = useState([]);

  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);

  const projectColor = projects.find((colorFind) =>
    colorFind.name.includes(newProject)
  )?.color;

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

    setNewProject("GermErase");
    setNewStart(now);
    setNewEnd(now);
    setNewComment("");
    setNewTags([]);

    setRerender(rerender + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      {newProject ? (
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
      ) : null}
      <View style={!newProject && { flexGrow: 1, justifyContent: "center" }}>
        <Btn
          title={
            newProject
              ? "Adding new " + newProject + " session"
              : "Select a project to get started"
          }
          type={newProject && "none"}
        />
      </View>
      {newProject ? (
        <>
          <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 2 }}>
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
        </>
      ) : null}
    </View>
  );
};
