// src/screens/FavoritesScreen.tsx
import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useFavoritesStore } from "../store/favoritesStore";
import { useThemeStore } from "../store/themeStore";
import RecipeCard from "../components/RecipeCard";

export default function FavoritesScreen({ navigation }: any) {
  const { favorites } = useFavoritesStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const bgColor = isDark ? "#121212" : "#FFFFFF";
  const textColor = isDark ? "#EEEEEE" : "#333333";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.title, { color: textColor }]}>❤️ Favorites</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: textColor }]}>
            Belum ada resep favorit.
          </Text>
          <Text style={[styles.emptySubtext, { color: isDark ? "#AAAAAA" : "#999999" }]}>
            Temukan resep favoritmu di halaman utama!
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <RecipeCard
              item={item}
              onPress={() => navigation.navigate("Detail", { id: item.id })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  list: {
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});