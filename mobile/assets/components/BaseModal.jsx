import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import { styled } from "nativewind";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const TWText = styled(Text);

const { height: windowHeight } = Dimensions.get("window");

const BaseModal = ({ visible, onClose, title, children }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      isVisible={visible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={[styles.modal, { marginBottom: Math.max(insets.bottom, 12) }]}
      backdropOpacity={0.7}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <BlurView intensity={8} tint="light" style={styles.blurContainer}>
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TWText 
                className="text-white font-koreanBold"
                style={{ fontSize: 20, letterSpacing: -2.4 }}>
                {title}
              </TWText>
            </View>
            <View style={styles.content}>
              {children}
            </View>
          </View>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
};

const RADIUS = 24;

const styles = StyleSheet.create({
  safeArea: {
    height: windowHeight * 0.7,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
    overflow: 'hidden',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  blurContainer: {
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
    overflow: "hidden",
  },
  modalContainer: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
    height: windowHeight * 0.7,
    paddingHorizontal: 20,
    paddingTop: 74,
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    overflow: 'hidden',
  },
  header: {
    borderBottomWidth: 0,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
});

export default BaseModal;