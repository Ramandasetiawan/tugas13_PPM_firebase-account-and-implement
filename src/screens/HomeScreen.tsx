// src/screens/HomeScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useRecipesStore } from "../store/recipesStore";
import { useThemeStore } from "../store/themeStore";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

export default function HomeScreen({ navigation }: any) {
  const { allRecipes, loading, error, fetchAllRecipes } = useRecipesStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const bgColor = isDark ? "#121212" : "#FFFFFF";
  const textColor = isDark ? "#EEEEEE" : "#333333";

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (allRecipes.length === 0) {
      fetchAllRecipes();
    }
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allRecipes;
    return allRecipes.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [allRecipes, search]);

  if (loading && allRecipes.length === 0) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.title, { color: textColor }]}>IndoFlavor</Text>
      <SearchBar value={search} onChange={setSearch} />
      <FlatList
        data={filtered}
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
});