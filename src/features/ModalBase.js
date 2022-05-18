import { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { H2 } from "../utils/styling";
import { Btn } from "./Btn";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export const ModalBase = ({
  children,
  modalVisible,
  setModalVisible,
  title,
  header = true,
}) => {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ backgroundColor: "rgba(0,0,0,0.4)", flex: 1 }}>
          <View
            style={{
              margin: 20,
              marginTop: 50,
              marginBottom: 50,
              backgroundColor: "white",
              flexShrink: 1,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
              borderRadius: 5,
            }}
          >
            <View>
              {header ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: "#31406f",
                    borderBottomWidth: 1,
                    borderColor: "#DEDEDE",
                    alignItems: "center",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                  }}
                >
                  <>
                    <H2 style={{ color: "white" }}>{title}</H2>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Ionicons name="close-outline" size={30} color="white" />
                    </TouchableOpacity>
                  </>
                </View>
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
              <View>{children}</View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
