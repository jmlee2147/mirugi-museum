import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
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
      <View className="gap-4">
        <TextInput
          placeholder="당신만의 작품을 남겨보세요."
          placeholderTextColor="#aaa"
          value={taskContent}
          onChangeText={setTaskContent}
          className="p-3 text-white border border-gray-400 rounded-lg text-body2 font-koreanBold"
        />
        
        <TouchableOpacity
          onPress={handleSubmit}
          className="py-3 bg-white rounded-lg"
        >
          <Text className="text-center text-black text-body2 font-koreanBold">
            저장
          </Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

export default TaskInputModal;