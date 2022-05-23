import { useState, useRef } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import {
  TagsContainer,
  TagssText,
  Input,
  TagsView,
} from "../infrastructure/commonStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "../infrastructure/scale";
import { Btn } from "./Btn";

const DeleteTag = styled.TouchableOpacity`
  padding-left: ${(props) => scale(props.theme.space[0]) + "px"};
`;

export const TagsHandler = ({ editable, tags = [], passNewTags }) => {
  let tagsList = useRef();
  const [newTag, setNewTag] = useState("");

  tagsList = tags;

  const handleRemoveTag = (i) => {
    const indexOfSession = tagsList.indexOf(i);
    tagsList.splice(indexOfSession, 1);
    console.log(tagsList);
    setNewTag("");
    passNewTags(tagsList);
    tagsList.slice();
  };

  const handleAddTag = () => {
    let formattedTag = newTag.replace(/[^a-zA-Z0-9]/g, "");
    tagsList.push(formattedTag);
    console.log(tagsList);
    setNewTag("");
    passNewTags(tagsList);
  };

  return (
    <>
      <TagsContainer>
        {tagsList.map((i, v) => (
          <TagsView key={v}>
            <TagssText>{i}</TagssText>
            {editable && (
              <DeleteTag onPress={() => handleRemoveTag(i)}>
                <Ionicons
                  name={"close-circle"}
                  size={scale(16)}
                  color="black"
                />
              </DeleteTag>
            )}
          </TagsView>
        ))}
      </TagsContainer>
      {editable && (
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Input
              placeholder="Enter new tags"
              multiline={true}
              value={newTag}
              onChangeText={(value) => setNewTag(value)}
              blurOnSubmit={false}
            />
            <Btn type="add" onPress={handleAddTag} />
          </View>
        </ScrollView>
      )}
    </>
  );
};
