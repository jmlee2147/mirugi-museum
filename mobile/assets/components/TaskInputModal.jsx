import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import BaseModal from "./BaseModal";

const TaskInputModal = ({ visible, onClose, onSubmit }) => {
  const [taskContent, setTaskContent] = useState("");

  const handleSubmit = () => {
    onSubmit(taskContent);
    setTaskContent("");
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="당신만의 작품을 남겨보세요.">
      <View>
        <TextInput
          placeholder="당신만의 작품을 남겨보세요."
          value={taskContent}
          onChangeText={setTaskContent}
          style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }}
        />
        <Button title="저장" onPress={handleSubmit} />
      </View>
    </BaseModal>
  );
};

export default TaskInputModal;