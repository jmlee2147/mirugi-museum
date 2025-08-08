import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return
    <SafeAreaView>
      <Stack screenOptions={{ headerShown: false }}/>
      <StatusBar style="dark" />
    </SafeAreaView>
}
