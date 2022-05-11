import { useState, useEffect, useContext } from "react";
import { Text, View } from "react-native";
import { SessionContext } from "../services/array.context";
import { ConvertTime } from "./convertTime";

export const TotalAllTime = () => {
  const [total, setTotal] = useState(0);
  const { sessions } = useContext(SessionContext);

  const periodTotal = sessions.reduce(
    (v, currentValue) =>
      (v = v + (currentValue.end.getTime() - currentValue.start.getTime())),
    0
  );

  useEffect(() => {
    setTotal(
      //function to change seconds to readable time format
      ConvertTime(periodTotal)
    );
  }, [periodTotal]);

  return (
    <View>
      <Text> {total} </Text>
    </View>
  );
};
