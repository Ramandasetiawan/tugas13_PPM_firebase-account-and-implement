// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";

export default function LoginScreen({ navigation }: any) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  
  const bgColor = isDark ? "#121212" : "#FFFFFF";
  const textColor = isDark ? "#EEEEEE" : "#333333";
  const inputBg = isDark ? "#1E1E1E" : "#F5F5F5";
  const inputBorder = isDark ? "#333" : "#DDD";
  const placeholderColor = isDark ? "#888" : "#999";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Peringatan", "Email dan password tidak boleh kosong");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Peringatan", "Format email tidak valid");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Peringatan", "Password minimal 6 karakter");
      return;
    }

    setLoading(true);
    try {
      await login(email);
     
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    } catch (error) {
      Alert.alert("Error", "Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bgColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: textColor }]}>Selamat Datang</Text>
          <Text style={[styles.subtitle, { color: isDark ? "#AAAAAA" : "#666" }]}>
            Silakan masuk untuk melanjutkan
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor: inputBorder }]}
              placeholder="Masukkan email"
              placeholderTextColor={placeholderColor}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor: inputBorder }]}
              placeholder="Masukkan password"
              placeholderTextColor={placeholderColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF7B00" }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Memuat..." : "Masuk"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.link, { color: "#FF7B00" }]}>
              Kembali ke beranda
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    fontSize: 15,
  },
});