import { Text, View, ImageBackground, Image, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useRef } from "react";
import { PenNibIcon } from "phosphor-react-native";
import Button from "../../assets/components/Button";
import TaskInputModal from "../../assets/components/TaskInputModal";

const getTestArtWorkByTaskContent = (taskContent) => {
  if (typeof taskContent !== "string") return null;
  return taskContent.includes("개발")
    ? { imageUrl: require("../../assets/images/test.png")}
    : null;
};

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const defaultArtwork = require("../../assets/images/defaultArtwork.png");
  const [dots, setDots] = useState("");

  const [showTaskModal, setShowTaskModal] = useState(false);
  const loadingOpacity = useRef(new Animated.Value(1)).current;

  const styles = StyleSheet.create({
    title: {
      color: "#fff",
      fontFamily: "Bookk-Myungjo-Bold", 
      fontSize: 16,
      letterSpacing: -1.6,
      marginBottom: 4,
      
    },
    label: {
      color: "#ccc",
      fontFamily: "Bookk-Myungjo",
      fontSize: 12,
      letterSpacing: -1,
      marginBottom: 12,
      
    },
    content: {
      color: "#FFF",
      fontFamily: "Bookk-Myungjo",
      fontSize: 14,
      letterSpacing: -1.4,
      marginBottom: 12,
    },
    description: {
      color: "#FFF",
      fontFamily: "Bookk-Myungjo",
      fontSize: 14,
      letterSpacing: -1.4,
      marginBottom: 12,
    },
    placeholderText: {
      color: "#fff",
      fontFamily: "Bookk-Myungjo-Bold", 
      fontSize: 16,
      letterSpacing: -1.6,
      marginBottom: 4,
    },
    placeholderContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#fff",
      paddingBottom: 4,
      marginBottom: 8,
    },

    placeholderIcon: {
      marginRight: 4,
    }
  });

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
            const fallback = getTestArtWorkByTaskContent(tasksData.data[0]?.content || "")
            setArtwork(matchedArtwork || fallback || null);
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
      }
    }
    fetchData();
  }, []);

  // 로딩 종료 시 페이드 아웃 후 언마운트
  useEffect(() => {
    if (!loading && showLoading) {
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => setShowLoading(false));
    }
  }, [loading, showLoading, loadingOpacity]);

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
          source={
            artwork?.imageUrl 
              ? typeof artwork.imageUrl === "string"
                ? { uri: artwork.imageUrl }
                : artwork.imageUrl
              : defaultArtwork
          }
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
            top: 400,
            left: 0,
            right: 0,
            paddingHorizontal: 24,
            alignItems: "center", 
          }}
        >
          {task ? (
            artwork?.title ? (
              <Text style={styles.title}>{artwork.title}</Text>
            ) : (
              <View style={styles.placeholderContainer}>
                <PenNibIcon size={16} color="#fff" weight="fill" style={styles.placeholderIcon} />
                <Text style={styles.placeholderText}>이 작품의 이름을 지어주세요 .</Text>
              </View>
            )
          ) : (
            <Text style={styles.title}>《 미루기 미술관에 오신 것을 환영합니다 》</Text>
          )}

          {task ? (
            artwork?.title ? (
              <>
                <Text style={styles.label}>
                  목표 완료일: {new Date(task.dueDate).toLocaleDateString()}
                </Text>
                <Text style={styles.content}>
                  {task.content}
                </Text>
                <Text style={styles.description}>
                  {artwork?.description || "설명 없음"}
                </Text>
              </>
            ) : null
          ) : (
            <Text style={styles.placeholderText}>
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
            setTask({ content: newTask, dueDate: new Date().toISOString() });
            setArtwork(getTestArtWorkByTaskContent(newTask));
            setShowTaskModal(false);
          }}
        />
      </ImageBackground>

      {/* 로딩 오버레이(페이드 아웃) */}
      {showLoading && (
        <Animated.View
          style={[StyleSheet.absoluteFillObject, { opacity: loadingOpacity, zIndex: 10 }]}
          pointerEvents={loading ? "auto" : "none"}
        >
          <ImageBackground
            source={require("../../assets/images/realbackground.png")}
            resizeMode="cover"
            style={ StyleSheet.absoluteFillObject }
          >
            <View style={{ 
              flex: 1, 
              backgroundColor: "rgba(0,0,0,0.6)", 
              justifyContent: "center", 
              alignItems: "center" 
            }}>
              <Image
                source={require("../../assets/images/loading.png")}
                style={{ width: 62, height: 117, marginBottom: 20 }}
              />
              <Text className="text-white text-body1 font-koreanBold">
                로딩 중 {dots}
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>
      )}
    </View>
  );
};  

export default HomeScreen;