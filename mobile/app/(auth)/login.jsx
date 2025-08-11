import React, { useEffect } from "react";
import { View, ImageBackground, Text } from "react-native";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import Button from "../../assets/components/Button";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const redirectUri = makeRedirectUri({ scheme: "mobile" });

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri,
    usePKCE: true,
  });

  useEffect(() => {
    if (response?.type === "success") {
      router.replace("/(tabs)/index");
    }
  }, [response]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/realbackground.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>
          <Text style={{ color: "white", fontSize: 24, fontFamily: "Bookk-Myungjo-Bold", marginBottom: 24, letterSpacing: -1 }}>
            로그인
          </Text>
          <Button
            fluid
            showIcon={false}
            onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
          >
            구글로 입장하기
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}