import { useState, useContext } from "react";
import { View, FlatList } from "react-native";
import { SessionContext } from "../services/array.context";
import { H3, H2 } from "../infrastructure/commonStyles";
import { SessionView } from "./SessionOverview";
import { Input } from "../infrastructure/commonStyles";
import { Btn } from "../infrastructure/Btn";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Readable } from "../functions/readableDateTime";
import { SessionList } from "./SessionList";
import { DashboardCard } from "./DashboardCard";

export const DashboardSessions = ({ isLoading }) => {
  const { sessions } = useContext(SessionContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSetTime = (value) => {
    setSelectedDate(value);
    setPickerOpen(false);
  };

  const sortedSessions = sessions.sort((a, b) => b.start - a.start);

  const dateSearch = sortedSessions.filter((date) => {
    return (
      date.start < new Date(selectedDate).setHours(23, 59, 59, 0) &&
      date.start > new Date(selectedDate).setHours(0, 0, 0, 0)
    );
  });

  return (
    <DashboardCard isLoading={isLoading}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <H2>{Readable(selectedDate, "date") + " sessions"}</H2>
        <Btn
          type={"none"}
          title={"Change date"}
          onPress={() => setPickerOpen(true)}
        />
        <DateTimePickerModal
          value={selectedDate}
          date={selectedDate}
          isVisible={pickerOpen}
          mode="date"
          onConfirm={(value) => handleSetTime(value)}
          onCancel={() => setPickerOpen(false)}
        />
      </View>
      <View>
        <SessionList
          data={dateSearch}
          horizontal
          inverse
          emptyListString="No sessions recorded on this date"
        />
      </View>
    </DashboardCard>
  );
};
