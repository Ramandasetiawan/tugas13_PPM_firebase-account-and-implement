import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#ffffffff" />
      <TextInput
        style={styles.input}
        placeholder="Cari Resep..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7B00",
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
  input: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
});
