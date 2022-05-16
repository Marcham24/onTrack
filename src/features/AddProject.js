import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  Button,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { categories, projects } from "../services/mock/array";
import { Picker } from "@react-native-picker/picker";
import ColorPicker from "react-native-wheel-color-picker";
import { Logo } from "./logo";
import { ProjectText, CategoryText } from "../utils/styling";
import Container, { Toast } from "toastify-react-native";
import { ProjectCard } from "./ProjectCard";

export const AddProject = () => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const [newProject, setNewProject] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState(randomColor);

  const [modalVisible, setModalVisible] = useState(false);

  const newProjectEntry = {
    name: newProject,
    category: newCategory,
    color: newColor,
  };

  const addProjectSuccess = async () => {
    Toast.success("Project added successfully");
  };

  const addProjectFailure = async () => {
    Toast.error("Project added successfully");
  };
  const addCategorySuccess = async () => {
    Toast.success("Category added successfully");
  };

  const addProject = () => {
    projects.push(newProjectEntry);

    setNewProject("");
    setNewCategory("");
    setNewColor(randomColor);
  };

  return (
    <>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              padding: 50,
              alignContent: "center",
            }}
          >
            <TextInput label="New category" onChangeText={setNewCategory} />
            <Button
              title="Add new category"
              onPress={() => {
                categories.push(newCategory);
                addCategorySuccess();
                setModalVisible(false);
              }}
            />
          </View>
        </Modal>
      </View>
      <ProjectCard
        project={newProject}
        category={newCategory}
        color={newColor}
        size={200}
        full={false}
        creation={true}
      />
      <View>
        <View style={{ padding: 12, flexGrow: 1 }}>
          <Button
            title="Add project"
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
          <View>
            <TextInput
              onChangeText={setNewProject}
              placeholder="Project name"
              value={newProject}
              selectionColor={"red"}
              underlineColorAndroid={"red"}
              style={{ backgroundColor: "white" }}
            />
          </View>
          <View>
            <Picker
              selectedValue={newCategory}
              onValueChange={(v, i) => setNewCategory(v)}
            >
              <Picker.Item
                label="Please select a category"
                value="Please select a category"
              />
              {categories.map((v, i) => {
                return <Picker.Item label={v} value={v} key={v} />;
              })}
            </Picker>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
          <View>
            <ColorPicker
              color={newColor}
              discreteLength={10}
              onColorChange={(color) => setNewColor(color)}
              thumbSize={20}
              noSnap={true}
              swatches={false}
              palette={[
                "#000000",
                "#0000FF",
                "#808080",
                "#00FF00",
                "#800080",
                "#FF0000",
                "#FFFF00",
                "#FF00FF",
                "#00FFFF",
                "#FFFFFF",
              ]}
            />
          </View>
        </View>
      </View>
    </>
  );
};
