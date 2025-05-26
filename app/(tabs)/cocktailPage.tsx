import AppFooter from "@/components/AppFooter";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CocktailPath, ServerName } from ".";
type Cocktail = {
  Alcohol: string;
  CreatorID: string;
  Description: string;
  ID: string;
  Image: string;
  Name: string;
  Recipe: string;
  Taste: string;
  Valid: string;
  Volume: string;
};
type Ingredients = {
  AlcoholContent: number;
  Categ: string;
  ID: string;
  Name: string;
};
export default function CocktailPage() {
  const { cocktailId } = useLocalSearchParams();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [ingredients, setIngredients] = useState<Ingredients[] | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(cocktailId);
  useEffect(() => {
    if (!cocktailId) return;

    const fetchCocktail = async () => {
      try {
        const response = await fetch(
          `http://${ServerName}:5050${CocktailPath}fetchCocktail`,
          {
            method: "POST", // Assuming you are sending the ID via a POST request
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: cocktailId }), // Send the cocktail ID in the body
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.success) {
          setCocktail(data.cocktail[0]);
          setIngredients(data.ingredients);
        } else {
          console.log("Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cocktail:", error);
      }
    };
    fetchCocktail();
  }, [cocktailId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CocktailApp</Text>
      <Image
        source={{
          uri: `http://${ServerName}:5050/cocktailImage/${cocktail?.Name.toLowerCase()
            .split(" ")
            .join("")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")}.png`,
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.cocktailName}>{cocktail?.Name}</Text>
        <Text style={styles.category}>{cocktail?.Taste}</Text>
        <Text style={styles.ingredients}>
          Ingredients:{" "}
          {ingredients?.map((element) => (
            <Text key={element.ID}>
              {element.Name} {element.Categ}{" "}
              {element.AlcoholContent !== 0 ? element.AlcoholContent : ""}{", "}
            </Text>
          ))}
        </Text>

        <Text style={styles.taste}>Description: {cocktail?.Description}</Text>
      </View>
      <AppFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  details: {
    marginTop: 10,
    alignItems: "center",
  },
  cocktailName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  category: {
    fontSize: 18,
    color: "gray",
  },
  ingredients: {
    marginTop: 5,
  },
  taste: {
    marginTop: 5,
    fontWeight: "bold",
  }
});
