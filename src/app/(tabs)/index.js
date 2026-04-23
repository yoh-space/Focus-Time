import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Pressable,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <SystemBars style={statusBarStyle} />
      <View style={[styles.header, { backgroundColor: colors.background}]}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary}]}>Focus</Text>
        <Text style={[styles.headerSubTitle, { color: colors.textSecondary }]}> What do you want to work on ?</Text>
      </View>
      <View
        style={[styles.inputContainer, { backgroundColor: colors.background, }]}
      >
        <TextInput
          placeholder="What would you like to focus ..."
          placeholderTextColor={colors.textSecondary}
          style={[styles.InputText, { backgroundColor: colors.surface, color: colors.textPrimary, borderRadius: 10, paddingHorizontal: 15 }]}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity
          style={[styles.fabButton, { backgroundColor: colors.background, borderColor: colors.outline }]}
          onPress={() => {
            addTask();
          }}
        >
          <Text style={[styles.fabText, { color: colors.primary}]}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.focusedTasks}>
        <Text style={[styles.focusTitle, { color: colors.textPrimary }]}>
          {" "}
          Previous Focused Tasks: {" "}
        </Text>
          <ScrollView
            style={{ padding: 20 }}
            contentContainerStyle={{ gap: 10, marginTop: 0 }}
          >
            {tasks.map((text, index) => (
              <Pressable
                style={[styles.tasksList, { backgroundColor: colors.surface }]}
                key={index}
                onPress={() => {
                  setSelectedTask(text);
                  router.push({
                    pathname: "/focusTime",
                  })
                }}
              >
                <Text style={[styles.taskText1, { color: colors.textSecondary }]}>
                  {index + 1}.
                </Text>

                <Text
                  key={index}
                  style={[styles.taskText, { color: colors.textPrimary }]}
                >
                {text}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
      </View>
    <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    padding: 20,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 28,
  },
  headerSubTitle:{
    fontSize: 18,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
  },
  InputText: {
    flex: 1,
    fontSize: 14
  },
  fabButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
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
    marginTop: 10,
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
    textDecorationLine: "line-through",
  },
  taskText1: {
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
  tasksList:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  }
});
