import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import TaskProvider from "../contexts/taskContexts";
import ColorProvider from "../contexts/colorContext";
import { useState, useEffect } from "react";
import { useColors } from "../contexts/colorContext";
import OnBoarding from "../components/onBoarding";
import { getItems, setItems } from "../utils/storage";

export default function RootLayout({ children }) {
  const DrawerContent = () => {
    const { colors, statusBarStyle } = useColors();
    return (
      <Drawer
        screenOptions={{
          drawerStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Focus Timer",
          }}
        />
      </Drawer>
    );
  };

  const [showOnboarding, setShowOnboarding] = useState(false);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingCompleted = await getItems("onboardingCompleted");
      setShowOnboarding(onboardingCompleted !== "true");
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    }
  };
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  if (showOnboarding) {
    return (
      <OnBoarding
        onFinish={async () => {
          await setItems("onboardingCompleted", "true");
          setShowOnboarding(false);
        }}
      />
    );
  } else {
    return (
      <ColorProvider>
        <TaskProvider>
          <DrawerContent />
        </TaskProvider>
      </ColorProvider>
    );
  }
}
