// src/screens/DetailScreen.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRecipesStore } from "../store/recipesStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { useThemeStore } from "../store/themeStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function DetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { allRecipes } = useRecipesStore();
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const { theme } = useThemeStore();
  
  const isDark = theme === "dark";
  const bgColor = isDark ? "#121212" : "#FFFFFF";
  const headerBg = isDark ? "#FF7B00" : "#3B82F6";
  const textColor = isDark ? "#EEEEEE" : "#333333";
  const secondaryColor = isDark ? "#CCCCCC" : "#555555";

  const recipe = allRecipes.find((r) => r.id === id);
  const isFavorite = favorites.some((item) => item.id === id);

  if (!recipe) {
    return (
      <View style={[styles.centered, { backgroundColor: bgColor }]}>
        <Text style={{ color: textColor }}>Resep tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <View style={[styles.containerWrapper, { backgroundColor: bgColor }]}>
      <View style={[styles.header, { backgroundColor: headerBg }]}>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs")} accessibilityLabel="Kembali ke beranda">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Resep</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <Text style={[styles.title, { color: textColor }]}>{recipe.name}</Text>
        <Text style={[styles.time, { color: secondaryColor }]}>
          Tingkat kesulitan: {recipe.difficulty}
        </Text>
        <Text style={[styles.time, { color: secondaryColor }]}>
          Waktu yang dibutuhkan: {recipe.cook_time}
        </Text>

        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => {
            if (isFavorite) {
              removeFavorite(recipe.id);
              Alert.alert("Berhasil", "Resep berhasil dihapus dari favorit!", [{ text: "OK" }]);
            } else {
              addFavorite(recipe);
              Alert.alert("Berhasil", "Resep berhasil ditambahkan ke favorit!", [{ text: "OK" }]);
            }
          }}
        >
          <Text style={styles.favoriteText}>
            {isFavorite ? "💔 Hapus dari Favorit" : "❤️ Tambah ke Favorit"}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Deskripsi</Text>
        <Text style={[styles.text, { color: secondaryColor }]}>{recipe.description}</Text>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Bahan-bahan</Text>
        {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((item, i) => (
            <Text key={i} style={[styles.text, { color: secondaryColor }]}>• {item}</Text>
          ))
        ) : (
          <Text style={[styles.text, { color: secondaryColor }]}>Tidak ada bahan tersedia</Text>
        )}

        {recipe.instructions ? (
          <>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Petunjuk</Text>
            {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? (
              recipe.instructions.map((item, i) => (
                <Text key={i} style={[styles.text, { color: secondaryColor }]}>
                  {i + 1}. {item}
                </Text>
              ))
            ) : (
              <Text style={[styles.text, { color: secondaryColor }]}>Tidak ada petunjuk tersedia</Text>
            )}
          </>
        ) : null}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 24,
  },
  scrollContainer: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  favoriteBtn: {
    backgroundColor: "#FF7B00",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  favoriteText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  bottomSpace: {
    height: 30,
  },
});