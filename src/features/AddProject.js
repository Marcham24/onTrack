import { useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { SessionContext } from "../services/array.context";
import { categories, projects, sessions } from "../services/mock/array";
import ColorPicker from "react-native-wheel-color-picker";
import { H2, Input } from "../infrastructure/commonStyles";
import { ProjectCard } from "./ProjectCard";
import { Btn } from "./Btn";
import { ModalBase } from "./ModalBase";
import styled from "styled-components/native";
import { Dropdown } from "react-native-element-dropdown";
import { scale } from "../infrastructure/scale";

export const AddProject = () => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const { rerender, setRerender } = useContext(SessionContext);
  const [newProject, setNewProject] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState(randomColor);

  const [modalVisible, setModalVisible] = useState(false);

  const creationBackground = newColor + "66";

  const newProjectEntry = {
    name: newProject,
    category: newCategory,
    color: newColor,
  };

  const addProject = () => {
    projects.push(newProjectEntry);

    setNewProject("");
    setNewCategory("");
    setNewColor(randomColor);
    setRerender(rerender + 1);
  };

  return (
    <>
      <View>
        <ModalBase
          title="Add new category"
          header={true}
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
          children={
            <View>
              <View>
                <Input
                  placeholder="Enter new category name"
                  onChangeText={setNewCategory}
                />
              </View>
              <View>
                <Btn
                  color="#ededed"
                  title="Save"
                  onPress={() => {
                    categories.push(newCategory);
                    setModalVisible(false);
                  }}
                />
              </View>
            </View>
          }
        />
      </View>
      <View style={{ flexGrow: 1 }}>
        <View
          style={{
            backgroundColor: creationBackground,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProjectCard
            project={newProject}
            category={newCategory}
            color={newColor}
            size={scale(160)}
            full={true}
            creation={false}
          />
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View>
            <View>
              <Input
                onChangeText={setNewProject}
                placeholder="Enter new project name"
                defaultValue={newProject}
              />
            </View>
            <View>
              <Input
                onChangeText={setNewCategory}
                placeholder="Enter category name"
                defaultValue={newCategory}
              />
              {/* <Dropdown
                maxHeight={300}
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={newCategory}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={sessions}
                labelField="project"
                valueField="comment"
              /> */}

              {/* <Picker
              selectedValue={newCategory}
              onValueChange={(v, i) => setNewCategory(v)}
              style={{
                backgroundColor: "white",
                color: "black",
                fontSize: 100,
              }}
            >
              <Picker.Item
                label="Please select a category"
                value="Please select a category"
              />
              {categories.map((v, i) => {
                return <Picker.Item label={v} value={v} key={v} />;
              })}
            </Picker> */}
              {/* <TouchableOpacity
                style={{
                  marginLeft: "auto",
                  paddingRight: 10,
                  paddingBottom: 10,
                }}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  style={{
                    textDecorationLine: "underline",
                    textDecorationStyle: "dotted",
                  }}
                >
                  Add new category{" "}
                </Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ padding: 10 }}>
              <ColorPicker
                color={newColor}
                discreteLength={10}
                onColorChange={(color) => setNewColor(color)}
                thumbSize={scale(15)}
                noSnap={true}
                swatches={false}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ flexShrink: 1 }}>
          <Btn
            title="Add project"
            color="white"
            type="add"
            onPress={() => {
              !newProject ||
              !newCategory ||
              newCategory === "Please select a category" ||
              newProject === "Project name"
                ? Alert.alert(
                    "Uh oh, something doesn't seem right!",
                    "Please check that you have entered both a project and category name."
                  )
                : addProject();
            }}
          />
        </View>
      </View>
    </>
  );
};
