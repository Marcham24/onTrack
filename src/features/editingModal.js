import { View, Text, Pressable } from "react-native";
import styled from "styled-components/native";

const H3 = styled.Text`
  font-size: 18px;
`;

export const EditingModal = (props) => {
  const handleChangeModalVisible = () => {
    props.changeModal();
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        padding: 50,
      }}
    >
      <View>
        <H3>Session editting modal</H3>
        <Pressable onPress={handleChangeModalVisible}>
          <Text>Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  );
};
