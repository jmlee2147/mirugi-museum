import { useEffect } from "react";
import { View, Image, ImageBackground, Text } from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/realbackground.png")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}
      >
        <Image
          source={require("../assets/images/loading.png")}
          style={{ width: 80, height: 150, marginBottom: 16 }}
        />
        <Text style={{ color: "white", fontFamily: "Bookk-Myungjo-Bold", letterSpacing: -1 }}>미루기 미술관</Text>
      </ImageBackground>
    </View>
  );
}