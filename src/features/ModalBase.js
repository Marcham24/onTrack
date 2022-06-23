import { useState } from "react";
import {
  ScrollView,
  Modal,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { H3 } from "../infrastructure/commonStyles";
import { Btn } from "./Btn";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "../infrastructure/scale";

export const ModalBase = ({
  children,
  modalVisible,
  setModalVisible,
  title,
  header = true,
  color = "white",
}) => {
  const ModalHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${color};
    border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
    padding: ${(props) => scale(props.theme.space[2]) + "px"};
  `;

  const ModalBody = styled.View`
    margin: ${(props) => scale(props.theme.space[0]) + "px"};
    background-color: white;
    flex-shrink: 1;
    border-radius: ${(props) => scale(props.theme.space[1]) + "px"};
    margin: ${(props) => scale(props.theme.space[2]) + "px"};
  `;
  return (
    <>
      <Modal
        avoidKeyboard
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            backgroundColor: "rgba(0,0,0,0.75)",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ModalBody>
            <View>
              {header ? (
                <ModalHeader>
                  <>
                    <H3>{title}</H3>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Ionicons name="close-outline" size={30} color="black" />
                    </TouchableOpacity>
                  </>
                </ModalHeader>
              ) : (
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons
                    name="close-outline"
                    size={30}
                    color="grey"
                    style={{ marginLeft: "auto", padding: 10 }}
                  />
                </TouchableOpacity>
              )}
              <ScrollView style={{ padding: 10 }}>{children}</ScrollView>
            </View>
          </ModalBody>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};
