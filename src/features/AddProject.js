import { useState } from "react";
import { Pressable, View, Text, Modal, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { categories } from "../services/mock/array";
import { Picker } from "@react-native-picker/picker";

export const AddProject = () => {
  const [newProject, setNewProject] = useState(null);
  const [newCategory, setNewCategory] = useState(null);
  const [newColor, setNewColor] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
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
            }}
          >
            <TextInput label="New category" onChangeText={setNewCategory} />
            <Button
              title="Add new category"
              onPress={() => {
                categories.push(newCategory);
                setModalVisible(false);
              }}
            />
          </View>
        </Modal>
      </View>
      <View>
        <TextInput
          label="Project name"
          onChangeText={setNewProject}
          value={newProject}
        />

        <Picker
          selectedValue={newCategory}
          onValueChange={(v, i) => setNewCategory(v)}
        >
          {categories.map((v, i) => {
            return <Picker.Item label={v} value={v} key={v} />;
          })}
        </Picker>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text>Add new category</Text>
        </Pressable>
        <View>
          <Text>
            {newProject} {newCategory} {newColor}
          </Text>
        </View>
      </View>
    </>
  );
};
