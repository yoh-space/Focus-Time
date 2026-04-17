# Onboarding Walkthrough (AsyncStorage + Lottie)

This is a simple step-by-step guide to implement the current onboarding flow in this project.

## 1) Install dependencies

Run these commands in the project root:

```bash
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context lottie-react-native
npm install react-native-onboarding-swiper
```

If Expo reports version mismatches, run:

```bash
npx expo install --check
```

## 2) Add your Lottie animation file

Create this file (or use your own animation file path):

`assets/animations/productivity.json`

## 3) Create the AsyncStorage helper

Create/update `src/utils/storage.js`:

```js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItems = async (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, serializedValue);
  } catch (error) {
    console.log(`Error saving "${key}": ${error}`);
  }
};

export const getItems = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.log(`Error reading "${key}": ${error}`);
    return null;
  }
};

export const removeItems = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Error removing "${key}": ${error}`);
  }
};
```

## 4) Build the onboarding screen with Lottie

Note: if you have both `src/components/onBoardingScreen.js` and `src/app/screens/onBoardingScreen.js`, your tabs layout currently imports the app screen version.

Create/update `src/app/screens/onBoardingScreen.js`:

```js
import { router } from "expo-router";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { setItems } from "../../utils/storage";

export default function OnBoardingScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Onboarding
        onDone={() => {
          setItems("onboardingCompleted", true);
          router.push("/");
          console.log("done");
        }}
        onSkip={() => console.log("skip")}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <LottieView
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
                source={require("../../../assets/animations/productivity.json")}
              />
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: (
              <LottieView
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
                source={require("../../../assets/animations/productivity.json")}
              />
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: (
              <LottieView
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
                source={require("../../../assets/animations/productivity.json")}
              />
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    </SafeAreaView>
  );
}
```

## 5) Show onboarding only once in tabs layout

Create/update `src/app/(tabs)/_layout.js` so it checks storage on app start:

```js
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { SystemBars } from "react-native-edge-to-edge";

import TaskProvider from "../../contexts/taskContexts";
import ColorProvider, { useColors } from "../../contexts/colorContext";
import { getItems } from "../../utils/storage";
import OnBoardingScreen from "../screens/onBoardingScreen";

export default function Layout() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await getItems("onboardingCompleted");
        setShowOnboarding(value === null);
      } catch (error) {
        console.log(`Error checking onboarding status: ${error}`);
      }
    };

    checkOnboardingStatus();
  }, []);

  const TabLayout = () => {
    const { colors, statusBarStyle } = useColors();

    return (
      <>
        <SystemBars style={statusBarStyle} />
        <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: colors.background,
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
              tabBarIcon: () => <Ionicons name="home-outline" size={24} color="grey" />,
            }}
          />
          <Tabs.Screen
            name="focusTime"
            options={{
              headerShown: false,
              tabBarIcon: () => <Ionicons name="timer-outline" size={24} color="grey" />,
            }}
          />
          <Tabs.Screen
            name="setting"
            options={{
              headerShown: false,
              tabBarIcon: () => <Ionicons name="settings-outline" size={24} color="grey" />,
            }}
          />
        </Tabs>
      </>
    );
  };

  if (showOnboarding === true) return <OnBoardingScreen />;
  if (showOnboarding === false)
    return (
      <ColorProvider>
        <TaskProvider>
          <TabLayout />
        </TaskProvider>
      </ColorProvider>
    );

  return null;
}
```

## 6) Run the app

```bash
npx expo start -c
npm run android
```

## 7) Re-test onboarding from scratch

If you want to show onboarding again, remove the stored key:

```js
await removeItems("onboardingCompleted");
```

## Quick troubleshooting

- If you see native module errors for AsyncStorage, run `npx expo install --check` and rebuild.
- If bundling fails after dependency changes, run `npx expo start -c`.
- If Lottie does not show, verify the JSON path: `assets/animations/productivity.json`.