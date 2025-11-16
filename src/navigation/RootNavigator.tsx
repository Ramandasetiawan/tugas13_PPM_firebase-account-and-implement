// src/navigation/RootNavigator.tsx
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../store/authStore";
import TabNavigator from "./TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import LoginScreen from "../screens/LoginScreen"; 

const Stack = createNativeStackNavigator<RootStackParamList & { Login: undefined }>();

export default function RootNavigator() {
  const { user, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF7B00" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Recipe Detail" }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Recipe Detail" }} />
        </>
      )}
    </Stack.Navigator>
  );
}

import DetailScreen from "../screens/DetailScreen";