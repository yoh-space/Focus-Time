import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { SystemBars } from "react-native-edge-to-edge";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useTasks } from "../../contexts/taskContexts";
import { useColors } from "../../contexts/colorContext";
export default function FocusTime() {
  const { colors } = useColors();
  const { setTasks, selectedTask } = useTasks();

  const focusTask = selectedTask;

  const [isRunning, setIsRunning] = useState(false);
  const times = [5, 900, 1200];
  const [selectedTime, setSelectedTime] = useState();

  const timeFromat = (times) => {
    const minutes = Math.floor(times / 60);
    const seconds = Math.floor(times % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const showToast = () => {
    Toast.show({
      position: "bottom",
      type: "info",
      text1: `You have successfully focused on ${focusTask}`,
    });
  };

  useEffect(() => {
    let intervalId;

    if (isRunning && selectedTime > 0) {
      intervalId = setInterval(() => {
        setSelectedTime((prev) => prev - 1);
      }, 1000);
    }

    if (!isRunning || selectedTime < 0) {
      clearInterval(intervalId);
    } else if (selectedTime === 0) {
      showToast();
      setIsRunning(false);
      setTasks((prev) => [...prev, selectedTask]);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, selectedTime]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            alignSelf: "flex-start",
          }}
        >
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.surface }]}
            onPress={() => {
              router.back();
              setSelectedTime(null);
            }}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <Text style={{ color: colors.textPrimary }}>Focus Session</Text>
        </View>

        <Text style={[styles.timerText, { color: colors.textPrimary }]}>
          {selectedTime ? timeFromat(selectedTime) : "00:00"}
        </Text>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.surface,
            gap: 10,
            alignItems: "center",
            marginTop: 10,
            marginLeft: 10,
            padding: 10,
            borderRadius: 15,
            width: '90%',
            minHeight: 80
          }}
        >
          <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
            Focusing on :{" "}
          </Text>
          <Text style={[styles.focusTask, { color: colors.textPrimary }]}>
            {focusTask}
          </Text>
        </View>

        <View
          style={[styles.timeOptions, { backgroundColor: colors.background }]}
        >
          {times.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeOptionsButton,
                { backgroundColor: colors.surface, borderColor: selectedTime === time ? colors.success : "transparent", borderWidth: 1 },
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[styles.timeOptionsText, { color: colors.textPrimary }]}
              >
                {timeFromat(time)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          disabled={!selectedTime || !selectedTask}
          style={[styles.startFab, { backgroundColor: isRunning ? colors.error : colors.surface}]}
          onPress={() => {
            setIsRunning(!isRunning);
          }}
        >
          <Text style={{ minHeight: 30, fontSize: 20, color: isRunning ? colors.onPrimary : colors.textSecondary }}>
            {isRunning ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
  },
  timerText: {
    fontWeight: "bold",
    fontSize: 60,
    color: "white",
    marginTop: 50,
  },
  subTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'semi-bold',
  },
  focusTask: {
    fontSize: 25,
    fontWeight: "bold",
  },
  timeOptions: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  timeOptionsButton: {
    height: 40,
    width: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  timeOptionsText: {
    fontSize: 18,
    color: "white",
  },
  startFab: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
    marginLeft: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
});
