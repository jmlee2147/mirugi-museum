import { Text, View, ImageBackground, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import Button from "../../assets/components/Button";
import TaskInputModal from "../../assets/components/TaskInputModal";

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const defaultArtwork = require("../../assets/images/defaultArtwork.png");
  const [dots, setDots] = useState("");

  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    if (!loading) return;  // 로딩 중일 때만 실행
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 300);
    return () => clearInterval(interval);
  }, [loading]);


  useEffect(() => {
    async function fetchData() {
      try {
        const userId = "clrk_123";
        const tasksRes = await fetch(`https://mirugi-museum.onrender.com/api/tasks/${userId}`);
        const tasksData = await tasksRes.json();

        if (tasksData.success && tasksData.data.length > 0) {
          setTask(tasksData.data[0]);

          const artworksRes = await fetch(`https://mirugi-museum.onrender.com/api/artworks/${userId}`);
          const artworksData = await artworksRes.json();

          if (artworksData.success && artworksData.data.length > 0) {
            const matchedArtwork = artworksData.data.find(a => a.taskId === tasksData.data[0].id);
            setArtwork(matchedArtwork || null);
          }
        } else {
          setTask(null);
          setArtwork(null);
        }
      } catch (error) {
        console.error(error);
        setTask(null);
        setArtwork(null);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setShowLoading(false);
      }, 1500);
      }
    }
    fetchData();
  }, []);

  if (showLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/realbackground.png")}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          {/* 어둡게 덮는 레이어 */}
          <View style={{ 
            flex: 1, 
            backgroundColor: "rgba(0,0,0,0.6)", 
            justifyContent: "center", 
            alignItems: "center" 
          }}>
            <Image
              source={require("../../assets/images/loading.png")} // 중앙에 띄울 이미지
              style={{ width: 62, height: 117, marginBottom: 20 }}
            />
            <Text className="text-white text-body1 font-koreanBold">
              로딩 중 {dots}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

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
            height: 100,
          }}
        />

        <Image
          source={artwork?.imageUrl ? { uri: artwork.imageUrl } : defaultArtwork}
          style={{
            position: 'absolute',
            top: 140,
            left: '50%',
            transform: [{ translateX: -110 }],
            width: 220,
            height: 220,
            resizeMode: 'contain',
            pointerEvents: 'none',
          }}
        />

        <Image
          source={require("../../assets/images/frame.png")}
          style={{
            position: 'absolute',
            top: 80,
            left: '50%',
            transform: [{ translateX: -174 }],
            width: 348,
            height: 348,
            resizeMode: 'contain',
            pointerEvents: 'none',
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 410,
            left: 0,
            right: 0,
            paddingHorizontal: 24,
            alignItems: "center",
            // 작품 설명과 버튼 간 간격 위해 paddingBottom 제거
            // paddingBottom: 212, // 제거
          }}
        >
          <Text className="text-white text-body2 font-koreanBold mb-4">
            {task ? (artwork?.title || "제목 없음") : "《 미루기 미술관에 오신 것을 환영합니다 》"}
          </Text>

          {task ? (
            <>
              <Text style={{ color: "#ccc", fontSize: 14, marginBottom: 2 }}>
                목표 기한: {new Date(task.dueDate).toLocaleDateString()}
              </Text>
              <Text style={{ color: "#ccc", fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
                {task.content}
              </Text>
              <Text style={{ color: "#ddd", fontSize: 14, fontStyle: "italic" }}>
                {artwork?.description || "설명 없음"}
              </Text>
            </>
          ) : (
            <Text className="text-white text-body3 font-koreanRegular">
              게으름 속에 피어난 예술
            </Text>
          )}
        </View>

        {/* 버튼은 작품 설명 뷰 밖에서 절대 위치로 별도 배치 */}
        <View style={{ position: "absolute", bottom: 48, left: 0, right: 0, alignItems: "center" }}>
          <Button onPress={() => setShowTaskModal(true)}>할 일 입력하기</Button>
        </View>

        {/* 모달 띄우기 */}
        <TaskInputModal
          visible={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          onSubmit={(newTask) => {
            // 새 할 일 저장 처리 로직 넣기
            console.log("새 할 일:", newTask);
            setShowTaskModal(false);
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;