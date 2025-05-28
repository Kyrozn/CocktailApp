import AppFooter from "@/components/AppFooter";
import CocktailDetails from "@/components/CocktailDetails";
import { useLocalSearchParams, withLayoutContext } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import { CocktailPath, ServerName } from ".";
import Header from "@/components/Header";

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
  Rating: number;
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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!cocktailId) return;

    const fetchCocktail = async () => {
      try {
        const response = await fetch(
          `http://${ServerName}:5050${CocktailPath}fetchCocktail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: cocktailId }),
          }
        );

        const data = await response.json();
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

  const imageUrl = cocktail
    ? `http://${ServerName}:5050/cocktailImage/${cocktail.Name.toLowerCase()
        .split(" ")
        .join("")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")}.png`
    : "";

  const handleCopyLink = async () => {
    const url = `http://${ServerName}:8081/cocktailPage?cocktailId=${cocktailId}`;
    await Clipboard.setStringAsync(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      <View style={[styles.container, {flex: 1}]}>
        <CocktailDetails
          cocktail={cocktail}
          ingredients={ingredients}
          imageUrl={imageUrl}
        />

        <TouchableOpacity style={styles.shareButton} onPress={handleCopyLink}>
          <Text style={styles.shareText}>Copy to the clipboard</Text>
        </TouchableOpacity>

        {copied && <Text style={styles.copiedText}>✅ Link copied!</Text>}
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
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  shareButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    width: 200,
  },
  shareText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  copiedText: {
    marginTop: 10,
    color: "green",
    fontSize: 16,
    fontWeight: "600",
  },
});
