import { useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SessionContext } from "../services/array.context";
import { categories, projects, sessions } from "../services/mock/array";
import ColorPicker from "react-native-wheel-color-picker";
import { H2, Input, DropdownStyled, V } from "../infrastructure/commonStyles";
import { ProjectCard } from "./ProjectCard";
import { Btn } from "../infrastructure/Btn";
import { ModalBase } from "./ModalBase";
import { scale } from "../infrastructure/scale";
import { Loading } from "./Toast";

export const AddProject = () => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const { rerender, setRerender } = useContext(SessionContext);
  const [newProject, setNewProject] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [category, setCategory] = useState("");
  const [newColor, setNewColor] = useState(randomColor);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const creationBackground = newColor + "66";

  const newProjectEntry = {
    name: newProject,
    category: category,
    color: newColor,
  };

  let toastStatus;
  let toastHeader;
  let toastMessage;

  const addProject = () => {
    toastStatus = "success";
    toastHeader = "Project added!";
    toastMessage = "Your new project has been added successfully.";
    projects.push(newProjectEntry);
    setLoading(!loading);
    setNewProject("");
    setCategory("");
    setNewCategory("");
    setNewColor(randomColor);
    Keyboard.dismiss();
    setRerender(rerender + 1);
  };

  const handleError = () => {
    toastStatus = "failure";
    toastHeader = "Uh-oh! Something has gone wrong.";
    toastMessage =
      "Please ensure that you have added a new project name and category.";
    setLoading(!loading);
  };

  const newCategoryEntry = {
    category: newCategory,
  };

  return (
    <>
      <View>
        <View>
          <ModalBase
            title="Add new category"
            color="grey"
            header={true}
            modalVisible={modalVisible}
            setModalVisible={() => setModalVisible(!modalVisible)}
            children={
              <>
                <View style={{ flexDirection: "row" }}>
                  <Input
                    placeholder="Enter new category name"
                    onEndEditing={(event) =>
                      setNewCategory(event.nativeEvent.text)
                    }
                    defaultValue={newCategory}
                  />
                  <Btn
                    color="#ededed"
                    type={"add"}
                    onPress={() => {
                      Keyboard.dismiss();
                    }}
                  />
                </View>
                <View>
                  <Btn
                    color="#ededed"
                    title="Save"
                    onPress={() =>
                      categories.findIndex(
                        (cat) => cat.category === newCategory
                      ) === -1
                        ? categories.push(newCategoryEntry) +
                          setModalVisible(false)
                        : Alert.alert(
                            "Uh oh, this category already exists",
                            "Please check the dropdown on the previous page."
                          )
                    }
                  />
                </View>
              </>
            }
          />
        </View>
        <View>
          <View
            style={{
              backgroundColor: creationBackground,
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProjectCard
              project={newProject}
              category={category}
              color={newColor}
              size={scale(200)}
              full={true}
              creation={false}
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView keyboardShouldPersistTaps="always">
              <View>
                <Input
                  onChangeText={setNewProject}
                  placeholder="Enter new project name"
                  defaultValue={newProject}
                />
              </View>
              <V row>
                <DropdownStyled
                  style={{ height: scale(60) }}
                  placeholder="Select category"
                  value={newCategory}
                  data={categories}
                  labelField="category"
                  valueField="category"
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  onChange={(item) => {
                    setCategory(item.category);
                  }}
                />
                <Btn type="add" onPress={() => setModalVisible(true)} />
              </V>
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
            </ScrollView>
            <View style={{ flexShrink: 1 }}>
              <Btn
                title="Add project"
                color="white"
                type="add"
                onPress={() => {
                  !newProject ||
                  !category ||
                  newCategory === "Please select a category" ||
                  newProject === "Project name"
                    ? handleError()
                    : addProject();
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
      <Loading
        toast
        loading
        isLoading={loading}
        status={toastStatus}
        header={toastHeader}
        message={toastMessage}
      />
    </>
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
