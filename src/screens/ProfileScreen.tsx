// src/screens/ProfileScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from "react-native";
import { useThemeStore } from "../store/themeStore";
import { useAuthStore } from "../store/authStore";
import { useRecipesStore } from "../store/recipesStore";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }: any) { 
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const { allRecipes } = useRecipesStore();

  const isDark = theme === "dark";
  const bgColor = isDark ? "#121212" : "#FFFFFF";
  const cardBg = isDark ? "#1F2937" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#1F2937";
  const secondaryColor = isDark ? "#9CA3AF" : "#6B7280";
  const borderColor = isDark ? "#374151" : "#E5E7EB";
  const switchThumb = isDark ? "#FF7B00" : "#FFFFFF";
  const switchTrack = isDark ? "#444444" : "#CCCCCC";

  const displayName = user?.email ? user.email.split("@")[0] : "Pengguna";
  const displayEmail = user?.email || "user@example.com";

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/e0/51/9e/e0519efc2ab6f5d7f6e83f0f8416f97d.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: textColor }]}>
          {displayName}
        </Text>
        <Text style={[styles.email, { color: secondaryColor }]}>
          {displayEmail}
        </Text>
      </View>

      <View style={[styles.menuContainer, { backgroundColor: cardBg }]}>
        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: borderColor }]}>
          <Ionicons name="person-outline" size={20} color={textColor} />
          <Text style={[styles.menuText, { color: textColor }]}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: borderColor }]}>
          <Ionicons name="notifications-outline" size={20} color={textColor} />
          <Text style={[styles.menuText, { color: textColor }]}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: borderColor }]}>
          <Ionicons name="settings-outline" size={20} color={textColor} />
          <Text style={[styles.menuText, { color: textColor }]}>App Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: borderColor }]}>
          <Ionicons name="help-circle-outline" size={20} color={textColor} />
          <Text style={[styles.menuText, { color: textColor }]}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem]}>
          <Ionicons name="information-circle-outline" size={20} color={textColor} />
          <Text style={[styles.menuText, { color: textColor }]}>About Us</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.themeSection, { backgroundColor: cardBg, marginTop: 20 }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Tampilan</Text>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: textColor }]}>
            {isDark ? "Mode Gelap" : "Mode Terang"}
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={switchThumb}
            trackColor={{ false: switchTrack, true: switchTrack }}
          />
        </View>
      </View>

      {/* Logout Button - Arahkan ke Login */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: "#FF7B00" }]}
        onPress={() => {
          Alert.alert(
            "Keluar",
            "Apakah Anda yakin ingin keluar?",
            [
              { text: "Batal", style: "cancel" },
              {
                text: "Keluar",
                onPress: async () => {
                  await logout();
                  navigation.navigate("Login"); // ✅ Arahkan ke halaman Login
                },
                style: "destructive"
              }
            ]
          );
        }}
      >
        <Text style={[styles.logoutText, { color: "white" }]}>LOGOUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#FF7B00",
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  menuContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "500",
  },
  themeSection: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
  },
  logoutButton: {
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "600",
  },
});