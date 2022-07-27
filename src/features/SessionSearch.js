import { useState, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SessionContext } from "../services/array.context";
import { H2 } from "../infrastructure/commonStyles";
import { SessionView } from "./SessionOverview";
import { Input } from "../infrastructure/commonStyles";
import { Btn } from "../infrastructure/Btn";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Readable } from "../functions/readableDateTime";
import { SessionList } from "./SessionList";
import { scale } from "../infrastructure/scale";
import { DropdownStyled } from "../infrastructure/commonStyles";
import { projects } from "../services/mock/array";
import { TagsHandler } from "./TagHandler";

export const SessionSearch = () => {
  const { sessions, rerender } = useContext(SessionContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date() - 3 * 24 * 60 * 60 * 1000);
  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);
  const [projectQuery, setProjectQuery] = useState("");
  const [tagsQuery, setTagsQuery] = useState([]);

  const handleSetStartTime = (value) => {
    setStartDate(value);
    setStartPickerOpen(false);
  };

  const handleSetEndTime = (value) => {
    setEndDate(value);
    setEndPickerOpen(false);
  };

  const sortedSessions = sessions.sort((a, b) => b.start - a.start);

  const dateSearch = sortedSessions.filter((date) => {
    return date.start < startDate && date.start > endDate;
  });

  // const onChangeSearch = (query) => setSearchQuery(query);

  const searchFilter = dateSearch.filter((query) => {
    return (
      query.project.toLowerCase().includes(projectQuery.toLowerCase()) &&
      tagsQuery.every((value) => {
        return query.tags?.includes(value);
      })
    );
  });

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <View style={{ flexShrink: 1 }}>
        <View>
          <DropdownStyled
            style={{ height: scale(50) }}
            maxHeight={scale(200)}
            placeholder="Select a project"
            // value={newProject}
            data={projects}
            labelField="name"
            valueField="name"
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            onChange={(item) => {
              setProjectQuery(item.name);
            }}
          />
          <TagsHandler
            editable
            passNewTags={setTagsQuery}
            tags={tagsQuery}
            search
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Btn
              mimicInput={true}
              type={"none"}
              title={Readable(endDate, "date")}
              onPress={() => setEndPickerOpen(true)}
            />
            <DateTimePickerModal
              value={startDate}
              date={startDate}
              isVisible={endPickerOpen}
              mode="date"
              onConfirm={(value) => handleSetEndTime(value)}
              onCancel={() => setEndPickerOpen(false)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Btn
              mimicInput={true}
              type={"none"}
              title={Readable(startDate, "date")}
              onPress={() => setStartPickerOpen(true)}
            />
            <DateTimePickerModal
              value={startDate}
              date={startDate}
              isVisible={startPickerOpen}
              mode="date"
              onConfirm={(value) => handleSetStartTime(value)}
              onCancel={() => setStartPickerOpen(false)}
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <SessionList data={searchFilter} />
      </View>
      <View style={{ flexShrink: 1 }}>
        <Btn title={"Export to CSV"} color="white" />
      </View>
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
