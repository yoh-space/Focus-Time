import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import { router } from "expo-router";
import { useTasks } from "../../contexts/taskContexts";
import { useColors } from "../../contexts/colorContext";
import Toast from "react-native-toast-message";

export default function App() {
  const { task, setTask, tasks, setSelectedTask } = useTasks();
  const { colors, statusBarStyle } = useColors();

  const showToast = () => {
    console.log("showing toast");
    Toast.show({
      position: "top",
      type: "error",
      text1: "Please enter a task to focus on",
    });
  };
  const addTask = () => {
    const trimmed = task.trim();

    if (trimmed.length > 0) {
      setTask("");
      setSelectedTask(trimmed);
      router.push({
        pathname: "/focusTime",
      });
    }
    if (trimmed.length === 0) {
      showToast();
      setTask("");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <SystemBars style={statusBarStyle} />
      <View
        style={[styles.inputContainer, { backgroundColor: colors.background }]}
      >
        <TextInput
          placeholder="What would you like to focus ..."
          mode={"outlined"}
          label="Focus"
          style={styles.InputText}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity
          style={[styles.fabButton, { backgroundColor: colors.textPrimary }]}
          onPress={() => {
            addTask();
          }}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.focusedTasks}>
        <Text style={[styles.focusTitle, { color: colors.textPrimary }]}>
          {" "}
          Things we've focused on:{" "}
        </Text>
        <ImageBackground
          style={styles.taskBackground}
          source={require("../../../assets/images/TaskScrollBackground.png")}
          resizeMode="cover"
        >
          <ScrollView
            style={{ padding: 20 }}
            contentContainerStyle={{ gap: 10, marginTop: 0 }}
          >
            {tasks.map((text, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  changeScreen();
                  setSelectedTask(text);
                }}
              >
                <Text
                  key={index}
                  style={[styles.taskText, { color: colors.textPrimary }]}
                >
                  - {text}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </ImageBackground>
      </View>
    <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
  },
  InputText: {
    flex: 1,
  },
  fabButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    marginLeft: 10,
  },
  fabText: {
    fontSize: 20,
    color: "white",
  },
  focusedTasks: {
    marginTop: 20,
    padding: 10,
    flex: 1,
  },
  focusTitle: {
    fontWeight: "bold",
    fontSize: 22,
    marginLeft: 10,
    color: "white",
  },
  taskText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    padding: 10,
  },
  taskBackground: {
    flex: 1,
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 20,
    marginTop: 10,
  },
});
