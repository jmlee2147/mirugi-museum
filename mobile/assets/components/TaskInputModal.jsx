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

  const handleSubmit = async () => {
    if (!taskContent || taskContent.trim() === "") {
      alert("할 일을 입력해 주세요.");
      return;
    }
    if (!dueDate) {
      alert("완료 날짜를 선택해 주세요.");
      return;
    }
    
    try {
      console.log("서버에 저장 요청 보냄:", taskContent, dueDate);
      const response = await fetch("https://mirugi-museum.onrender.com/api/tasks", {
        method: 'POST',
        headers: { "Content-Type" : 'application/json' },
        body: JSON.stringify({
          userId: "clrk_123",  // 테스트용 하드코딩 사용자 ID
          content: taskContent,
          dueDate: dueDate.toISOString(),
          status: "pending",
        }),
      });
      
      console.log("서버 응답 상태:", response.status);
      if(!response.ok) {
        throw new Error("Failed to save task");
      }
  
      const data = await response.json();
      console.log("서버 응답 데이터:", data); 
      alert('할 일이 저장되었습니다.');
      setTaskContent("");
      setDueDate(null); 
      onSubmit(data.data); // 부모 컴포넌트에 알림
    
    }  catch (error) {
      alert('할 일을 저장하는 데 실패했습니다.');
    }
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
              showIcon={false}
              innerColor="#6c6c6c"
              style={{ flex: 1 }}
              onPress={handleSubmit}
            >
              저장하기
            </Button>
            <Button
              fluid
              showIcon={false}
              innerColor="#3a3a3a"
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