import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚠️ {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: "red",
    fontSize: 16,
  },
});