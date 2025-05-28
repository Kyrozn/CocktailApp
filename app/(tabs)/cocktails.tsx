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
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import AppFooter from "@/components/AppFooter";
import { CocktailPath, ServerName } from ".";
import { Cocktail, CocktailCard } from "@/components/CocktailCard";
import Header from "@/components/Header";
import Icon from "react-native-vector-icons/FontAwesome";


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
  const searchCocktail = async (query: string) => {
    try {
      const response = await axios.post(
        `http://${ServerName}:5050${CocktailPath}searchCocktail`,
        { sentence: query }
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
    /*<View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Ionicons name="filter" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            if (text.length === 0) {
              fetchCocktails(); // recharge tous les cocktails si l'utilisateur vide le champ
            } else if (text.length >= 3) {
              searchCocktail(text); // ne lance la recherche que si 3+ caractères
            }
          }}
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
            onPress={() => {
              setSelectedFilter(filter);
              FilterCocktail(filter);
            }}
          >
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
          data={cocktailData}
          keyExtractor={(item) => item.ID}
          numColumns={3}
          contentContainerStyle={styles.container.grid}
          columnWrapperStyle={{ justifyContent: "center" }}
          renderItem={({ item }) => <CocktailCard data={item} />}
        />
      <AppFooter />
    </View>*/
    <View style={styles.container.body}>
      <Header />
      <ScrollView style={{ flex: 1, paddingTop: 40 }}>
        <View style={{ marginInline: "auto" }}>
          <View style={styles.search.container}>
            <View style={{ ...styles.search.element, flex: 1 }}>
              <TextInput
                style={styles.search.input}
                placeholder="Search ..."
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  if (text.length === 0) {
                    fetchCocktails(); // recharge tous les cocktails si l'utilisateur vide le champ
                  } else if (text.length >= 3) {
                    searchCocktail(text); // ne lance la recherche que si 3+ caractères
                  }
                }}
              />
              <TouchableOpacity
                style={styles.button.bg.primary}
                onPress={() => router.push("/createCocktail")}
              >
                <Icon
                  name="plus"
                  size={14}
                  color="#fff"
                  style={styles.button.icon.primary}
                />
                <Text style={styles.button.text.primary}>New</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.search.element}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filter.button,
                    selectedFilter === filter
                      ? styles.filter.selected
                      : styles.filter.default,
                  ]}
                  onPress={() => {
                    setSelectedFilter(filter);
                    FilterCocktail(filter);
                  }}
                >
                  {selectedFilter === filter && (
                    <Icon
                      name="check"
                      size={16}
                      color={styles.filter.selectedText.color}
                    />
                  )}

                  <Text
                    style={
                      selectedFilter === filter
                        ? styles.filter.selectedText
                        : styles.filter.defaultText
                    }
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
           </View>

          <FlatList
            data={cocktailData}
            keyExtractor={(item) => item.ID}
            numColumns={3}
            contentContainerStyle={styles.container.grid}
            columnWrapperStyle={{ justifyContent: "center" }}
            renderItem={({ item }) => <CocktailCard data={item} />}
            style={{height: "100%"}}
          />
        </View>
        <AppFooter />
      </ScrollView>
    </View>
  );
}

const styles = (() => {
  const global = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: "#fff",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return {
    global,
    button: {
      bg: StyleSheet.create({
        primary: {
          ...global.button,
          backgroundColor: "#2C2C2C",
        },
      }),
      text: StyleSheet.create({
        primary: {
          ...global.buttonText,
          color: "#fff",
        },
      }),
      icon: StyleSheet.create({
        primary: {
          marginRight: 8,
        },
      }),
    },
    container: StyleSheet.create({
      body: {
        flex: 1,
        backgroundColor: "#fff",
      },
      grid: {
        justifyContent: "center",
        paddingBottom: 50,
        flexGrow: 1,
        alignItems: "center",
      },
    }),
    search: StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 24,
        flex: 1,
      },
      element: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      },
      input: {
        flex: 1,
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#ccc",
      },
    }),
    filter: StyleSheet.create({
      button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 5,
      },
      default: {
        backgroundColor: "#F5F5F5",
      },
      defaultText: {
        color: "#757575",
      },
      selected: {
        backgroundColor: "#3A3A3A",
      },
      selectedText: {
        color: "#F5F5F5",
      },
    }),
  };
})();