import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import AppFooter from "@/components/AppFooter";
import { CocktailPath, ServerName } from ".";
import { Cocktail, CocktailCard } from "@/components/CocktailCard";

export default function ProductPage() {
  const [cocktailData, setCocktailData] = useState<Cocktail[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("No Filter");

  const filters = ["No Filter", "Taste", "Alcohol Degrees", "Rating"];

  const fetchCocktails = async () => {
    try {
      const response = await axios.get(
        `http://${ServerName}:5050${CocktailPath}fetchCocktails`
      );
      setCocktailData(response.data.cocktails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const FilterCocktail = async (filter: string) => {
    try {
      const response = await axios.post(
        `http://${ServerName}:5050${CocktailPath}filterCocktails`, {filter: filter}
      );
      setCocktailData(response.data.cocktails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCocktails();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="filter" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="person-circle-outline" size={24} color="black" />
      </View>
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilter,
            ]}
            onPress={() => {setSelectedFilter(filter); FilterCocktail(filter);}}
          >
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={cocktailData}
        keyExtractor={(item) => item.ID}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: "center" }}
        renderItem={({ item }) => <CocktailCard data={item} />}
      />
      <AppFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  filterButton: {
    padding: 6,
    marginHorizontal: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedFilter: { backgroundColor: "black" },
  filterText: { color: "black", fontSize: 14 },
  grid: {
    justifyContent: "center",
    paddingBottom: 50,
    paddingHorizontal: 10,
    flexGrow: 1,
    alignItems: "center", // Centre le contenu
  },
  card: {
    width: 300, // Taille ajustée pour un bon affichage
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    marginHorizontal: 10, // Espacement latéral
    marginBottom: 20, // Espacement entre les lignes
  },
  image: {
    width: "100%",
    height: 200,
    borderTopEndRadius: 20,
  },
  cardContent: {
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
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
