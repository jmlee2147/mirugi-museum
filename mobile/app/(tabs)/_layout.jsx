import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { BankIcon, FileIcon, BookBookmarkIcon, UserCircleIcon } from "phosphor-react-native";

const TabsLayout = () => {
  return (
    <>
      {/* 탭바 위 그라데이션 */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      />
      
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#888888",
          tabBarStyle: {
            backgroundColor: "#000000",
            height: 77,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Bookk-Myungjo",
            letterSpacing: -0.1,
            marginTop: 6,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "전시관",
            tabBarIcon: ({ color, size }) => <BankIcon color={color} size={size} weight="fill" />,
          }}
        />
        <Tabs.Screen
          name="todoList"
          options={{
            tabBarLabel: "기록실",
            tabBarIcon: ({ color, size }) => <FileIcon color={color} size={size} weight="fill"/>,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            tabBarLabel: "도감",
            tabBarIcon: ({ color, size }) => <BookBookmarkIcon color={color} size={size} weight="fill" />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "프로필",
            tabBarIcon: ({ color, size }) => <UserCircleIcon color={color} size={size} weight="fill"/>,
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    bottom: 77, // 탭바 높이만큼 띄우기
    left: 0,
    right: 0,
    height: 30, // 그라데이션 높이 조절
    zIndex: 10,
  },
});

export default TabsLayout;