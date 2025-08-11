import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { PenNibIcon } from "phosphor-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Button({ onPress, children, style, fluid = false, showIcon = true, innerColor = "#735C51" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          borderRadius: 999,
          overflow: "hidden",
          width: fluid ? undefined : 234,
          height: 44,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 15,
          shadowOffset: { width: 0, height: 5 },
          elevation: 5,
        },
        style,
      ]}
    >
      {/* Gradient border (top -> bottom) */}
      <LinearGradient
        colors={["#F2F2F2", "#818181", "#FFFFFF"]}
        locations={[0, 0.41, 1]}
        start={[0, 0]}
        end={[0, 1]}
        style={{ flex: 1, borderRadius: 999, padding: 3 }}
      >
        {/* Inner rounded container that holds glassy content */}
        <View style={{ flex: 1, borderRadius: 999, overflow: "hidden" }}>
          {/* Glass blur layer */}
          <BlurView
            intensity={30}
            tint="light"
            style={StyleSheet.absoluteFillObject}
          />

          {/* Solid inner fill */}
          <View style={{ flex: 1, borderRadius: 999, backgroundColor: innerColor }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                gap: 6,
              }}
            >
              {showIcon && <PenNibIcon size={16} weight="fill" color="white" />}
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Bookk-Myungjo-Bold",
                  letterSpacing: -1,
                }}
              >
                {children}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}