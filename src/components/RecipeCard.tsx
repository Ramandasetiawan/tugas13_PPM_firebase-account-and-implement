// src/components/RecipeCard.tsx
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Recipe } from "../types/recipe";

interface RecipeCardProps {
  item: Recipe;
  onPress: () => void;
}

export default function RecipeCard({ item, onPress }: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.origin} numberOfLines={1}>
          {item.origin}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: "100%",
    height: 120,
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  origin: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
});