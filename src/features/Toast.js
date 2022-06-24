import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "../infrastructure/scale";
import { BodyText, H3 } from "../infrastructure/commonStyles";

export const Toast = () => {
  const height = Dimensions.get("window").height;
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(height)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "You pressed the success button";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "You pressed the fail button";

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: height - scale(250),
      duration: 300,
      useNativeDriver: true,
    }).start(popOut());
  };

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 5000);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: height,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View>
      <Animated.View
        style={[
          styles.toastContainer,
          {
            transform: [{ translateY: popAnim }],
          },
        ]}
      >
        <View style={styles.toastRow}>
          <Ionicons
            name={status === "success" ? "alert-outline" : "close-outline"}
            size={24}
            color={status === "success" ? successColor : failColor}
          />
          <View style={styles.toastText}>
            <H3>{status === "success" ? successHeader : failHeader}</H3>
            <BodyText>
              {status === "success" ? successMessage : failMessage}
            </BodyText>
          </View>
          <TouchableOpacity onPress={instantPopOut}>
            <Ionicons name="close-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Button
        title="Success Message"
        onPress={() => {
          setStatus("success");
          popIn();
        }}
        style={{ marginTop: 30 }}
      ></Button>

      <Button
        title="Fail Message"
        onPress={() => {
          setStatus("fail");
          popIn();
        }}
        style={{ marginTop: 30 }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  toastRow: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  toastText: {
    width: "70%",
    padding: 2,
  },
});
