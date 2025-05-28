import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export type Cocktail = {
  ID: string;
  Name: string;
  Description: string;
  Rating: number;
  Taste: string;
  Recipe: string;
};

type Ingredient = {
  AlcoholContent: number;
  Categ: string;
  ID: string;
  Name: string;
};

type Props = {
  cocktail: Cocktail | null;
  ingredients: Ingredient[] | null;
  imageUrl: string;
};

const CocktailDetails: React.FC<Props> = ({
  cocktail,
  ingredients,
  imageUrl,
}) => {
  if (!cocktail) return null;

  const maxStars = 5;
  const filledStars = cocktail.Rating
    ? Math.min(Math.floor(cocktail.Rating), maxStars)
    : 0;
  const emptyStars = maxStars - filledStars;

  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.textContent}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{cocktail.Name}</Text>
          </View>

          <View style={styles.stars}>
            {[...Array(filledStars)].map((_, i) => (
              <FontAwesome
                key={`filled-${i}`}
                name="star"
                size={16}
                color="#FFD700"
              />
            ))}
            {[...Array(emptyStars)].map((_, i) => (
              <FontAwesome
                key={`empty-${i}`}
                name="star-o"
                size={16}
                color="#FFD700"
              />
            ))}
          </View>

          <Text style={styles.shortDesc}>{cocktail.Description}</Text>

          <Text style={styles.subTitle}>Ingredients</Text>
          <View style={styles.ingredientList}>
            {ingredients?.map((element) => (
              <Text key={element.ID} style={styles.ingredientItem}>
                • {element.Name.toLowerCase()}
              </Text>
            ))}
          </View>

          <Text style={styles.subTitle}>
            Recipe <Text style={styles.tasteBadge}>{cocktail.Taste}</Text>
          </Text>
          <Text style={styles.recipeText}>{cocktail.Recipe}</Text>

          <Text style={styles.author}>Author</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 100,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 50,
  },
  image: {
    width: 260,
    height: 340,
    borderRadius: 15,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginRight: 10,
  },
  tasteBadge: {
    backgroundColor: "#444",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 14,
    overflow: "hidden",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 8,
  },
  shortDesc: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientList: {
    marginLeft: 10,
    marginBottom: 15,
  },
  ingredientItem: {
    fontSize: 16,
    color: "#000",
    marginBottom: 3,
  },
  recipeText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
    lineHeight: 20,
  },
  author: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 20,
    color: "#555",
  },
});

export default CocktailDetails;
