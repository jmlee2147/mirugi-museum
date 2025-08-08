import { TouchableOpacity, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { PenNibIcon } from "phosphor-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Button({ onPress, children }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        borderRadius: 999,
        overflow: "hidden", 
        width: 234,      
        height: 44,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5, // Android 그림자
      }}
    >
      <BlurView
        intensity={30} // 흐림 정도 조절
        tint="light" // 'light' | 'dark' | 'default'
        style={{ flex: 1 }}
      >
        <LinearGradient
            colors={['rgba(214,214,214,0.3)', 'rgba(255,255,255,0.1)']}
            start={[0, 0]}
            end={[1, 1]}
            style={{ 
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "rgba(214,214,214,1)", // Stroke (테두리) - Inside 느낌은 BorderWidth 로 구현
                paddingHorizontal: 20,
                gap: 6,
            }}
        > 
            <PenNibIcon size={16} weight="fill" color="white"/>
            <Text style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Bookk-Myungjo-Bold',
                letterSpacing: -1
                }}>
                {children}  
            </Text>
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  );
}