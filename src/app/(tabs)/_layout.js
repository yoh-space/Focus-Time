import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TaskProvider from "../../contexts/taskContexts";
import ColorProvider from "../../contexts/colorContext";
import { useColors } from "../../contexts/colorContext";
import { SystemBars} from 'react-native-edge-to-edge';

export default function Layout() {

    const TabLayout = () => {
        const { colors, statusBarStyle} = useColors();
        return (
            <>
                <SystemBars style={statusBarStyle}/> 
                <Tabs
                screenOptions={{
                    tabBarStyle: {
                    backgroundColor: colors.background,
                    setOffset: 0,
                    borderTopWidth: 0,
                    },
                    tabBarActiveTintColor: colors.Primary,
                    tabBarInactiveTintColor: colors.textPrimary,
                }}
                >
                <Tabs.Screen
                    name="index"
                    options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Ionicons name="home-outline" size={24} color="grey" />
                    ),
                    }}
                />
                <Tabs.Screen
                    name="focusTime"
                    options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Ionicons name="timer-outline" size={24} color="grey" />
                    ),
                    }}
                />
                <Tabs.Screen
                    name="setting"
                    options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Ionicons name="settings-outline" size={24} color="grey" />
                    ),
                    }}
                />
                </Tabs>  
            </>        
        )
    }
  return (
    <ColorProvider>
      <TaskProvider>
        <TabLayout />
      </TaskProvider>
    </ColorProvider>
  );
}
