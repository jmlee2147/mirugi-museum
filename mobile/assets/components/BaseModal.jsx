import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";

const { height: windowHeight } = Dimensions.get("window");

const BaseModal = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      isVisible={visible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropOpacity={0.7}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <BlurView
        intensity={8}
        tint="light"
        style={styles.blurContainer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  blurContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  modalContainer: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: windowHeight * 0.7,
    paddingHorizontal: 20,
    paddingTop: 74,
    paddingBottom: 30,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  }
});

export default BaseModal;