import { View, Text, Pressable } from "react-native";
import styled from "styled-components/native";
import { Input, TagssText } from "../infrastructure/commonStyles";
import { Btn } from "./Btn";
import Ionicons from "@expo/vector-icons/Ionicons";

const TagsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  flex-wrap: wrap;
  padding: 10px;
`;

export const EditingModal = (props, { start, end, comment, tags }) => {
  const handleChangeModalVisible = () => {
    props.changeModal();
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}></View>
      <Input value={comment} editable={false} multiline={true} />
      <TagsContainer>
        {tags?.map((i) => (
          <TagssText key={i}>#{i}</TagssText>
        ))}
      </TagsContainer>

      <Pressable onPress={handleChangeModalVisible}>
        <Text>Hide Modal</Text>
      </Pressable>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Btn title="Edit" type="edit" />
        <Btn
          type="delete"
          title="Delete"
          // onPress={() =>
          //   Alert.alert(
          //     "Are you sure you want to delete this session entry?",
          //     "Once deleted, you cannot get this sesson entry back.",
          //     [
          //       {
          //         text: "Delete",
          //         onPress: () => {
          //           deleteSession(start), setRerender(rerender + 1);
          //         },
          //       },
          //       { text: "Go back" },
          //     ]
          //   )
          // }
        />
      </View>
    </View>
  );
};
