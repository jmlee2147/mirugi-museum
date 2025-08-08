import { Text, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/realbackground.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 100, // 필요한 만큼 높이 조절
          }}
        />
      </ImageBackground>
    </View>
      
  );

};

export default HomeScreen;