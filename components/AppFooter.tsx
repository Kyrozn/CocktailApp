import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppFooter() {
  return (
    <View style={styles.footer}>
      <View style={styles.footerIcons}>
        <Ionicons name="logo-instagram" size={24} color="black" />
        <Ionicons name="logo-youtube" size={24} color="black" />
        <Ionicons name="logo-linkedin" size={24} color="black" />
      </View>
      <Text style={styles.footerText}>
        Use cases: UI design | UX design | Wireframing
      </Text>
      <Text style={styles.footerText}>
        Explore: Design | Prototyping | FigJam
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    marginTop: 20,
  },
  footerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginBottom: 10,
  },
  footerText: { fontSize: 12, color: "gray", textAlign: "center" },
});
