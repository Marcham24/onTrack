import { useState, useContext } from "react";
import { View, FlatList, Button } from "react-native";
import { Logo } from "./logo";
import { SessionContext } from "../services/array.context";
import { H2 } from "../infrastructure/commonStyles";
import { SessionView } from "../features/sessionOverview";
import { Input } from "../utils/styling";
import { Btn } from "./Btn";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Readable } from "./ReadableDateTime";

export const ViewSessions = () => {
  const { sessions, rerender } = useContext(SessionContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date() - 30 * 24 * 60 * 60 * 1000);
  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);

  const renderItem = ({ item }) => (
    <Item
      project={item.project}
      start={item.start}
      end={item.end}
      comment={item.comment}
      tags={item.tags}
    />
  );

  const Item = ({ project, start, end, comment, tags }) => (
    <View>
      <SessionView
        project={project}
        start={start}
        end={end}
        comment={comment}
        tags={tags}
        creation={false}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexShrink: 1 }}>
        <View>
          <Input placeholder={"Search for projects, tags or comments..."} />
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
              value={endDate}
              isVisible={endPickerOpen}
              mode="date"
              onConfirm={(value) => setEndDate(value)}
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
              isVisible={startPickerOpen}
              mode="date"
              onConfirm={(value) => setStartDate(value)}
              onCancel={() => setStartPickerOpen(false)}
            />
          </View>
        </View>
      </View>
      <FlatList
        style={{ flex: 2 }}
        keyboardShouldPersistTaps="always"
        data={sessions.sort((a, b) => b.start - a.start)}
        keyExtractor={(item) => item.start}
        renderItem={renderItem}
        extraData={rerender}
      />
      <View style={{ flexShrink: 1 }}>
        <Btn title={"Export to CSV"} color="white" />
      </View>
    </View>
  );
};
