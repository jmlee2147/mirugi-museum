import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styled } from "nativewind";
import BaseModal from "./BaseModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "./Button";

const TWText = styled(Text);

const TaskInputModal = ({ visible, onClose, onSubmit }) => {
  const [taskContent, setTaskContent] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSubmit = () => {
    onSubmit(taskContent);
    setTaskContent("");
    setDueDate(null);
    onClose();
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => { 
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setDueDate(date);
    hideDatePicker();
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="당신만의 작품을 남겨보세요.">
      <View style={{ flex: 1, marginTop: 36 }}>
        <TWText 
          className="text-white font-koreanBold"
          style={{ fontSize: 16, letterSpacing: -1.6, marginBottom: 12 }}>
          무엇을 미루고 있나요?
        </TWText>

        <TextInput
          placeholderTextColor="#aaa"
          value={taskContent}
          onChangeText={setTaskContent}
          className="p-4 text-white border border-gray-400 rounded-lg text-body2 font-koreanBold"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            height: 34,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }}
        />

        <TWText
          className="text-white font-koreanBold"
          style={{ fontSize: 16, letterSpacing: -1.6, marginTop: 48, marginBottom: 12 }}>
          언제까지 완료하고 싶나요?
        </TWText>
        
        <TouchableOpacity
          onPress={showDatePicker}
          className="p-4 border border-gray-400 rounded-lg"
          style={{ 
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            height: 34,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            justifyContent: "center",
            paddingHorizontal: 12,
          }}
        >
          <TWText className="text-white font-koreanRegular">
            {dueDate ? dueDate.toLocaleDateString() : "날짜를 선택하세요."}
          </TWText>
        </TouchableOpacity>

        {/* Bottom button row */}
        <View style={{ marginTop: 24, marginBottom: 6 }} />
        <View style={{ marginTop: "auto" }}>
          <View style={{ flexDirection: "row", gap: 12, paddingHorizontal: 4 }}>
            <Button
              fluid
              style={{ flex: 1 }}
              onPress={handleSubmit}
            >
              저장하기
            </Button>
            <Button
              fluid
              style={{ flex: 1 }}
              onPress={onClose}
            >
              취소하기
            </Button>
          </View>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </BaseModal>
  );
};

export default TaskInputModal;