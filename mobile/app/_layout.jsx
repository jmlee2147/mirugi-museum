import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Slot } from "expo-router";
import { SafeAreaView, View, ActivityIndicator, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput } from "react-native";
import SafeScreen from "../assets/components/SafeScreen";

import { Ionicons } from "@expo/vector-icons";

// 접근성 폰트 크기 변경 무시
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Bookk-Myungjo": require("../assets/fonts/BookkMyungjo_Light.ttf"),
        "Bookk-Myungjo-Bold": require("../assets/fonts/BookkMyungjo_Bold.ttf"),
        "Crimson-Text-Regular": require("../assets/fonts/CrimsonText-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeScreen>
      <Slot />
    </SafeScreen>
  );
}