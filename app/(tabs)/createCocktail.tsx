import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

type CocktailCardProps = {
  image: any;
  title: string;
  ingredients: string[];
  recipe: string;
  isCreated: boolean;
  onDelete?: () => void;
};

const CocktailCard: React.FC<CocktailCardProps> = ({
  image,
  title,
  ingredients,
  recipe,
  isCreated,
  onDelete,
}) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.title}>
          {title} <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
        </Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {ingredients.map((item, index) => (
          <Text key={index} style={styles.ingredient}>
            - {item}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Recipe</Text>
        <TouchableOpacity style={styles.stepButton}>
          <Text style={styles.stepText}>Step</Text>
        </TouchableOpacity>
        <Text style={styles.recipeText}>{recipe}</Text>

        <Text style={styles.author}>Author</Text>
      </View>
    </View>

    {isCreated && (
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default function CreateCocktail() {
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [author, setAuthor] = useState("");
  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else {
          if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0].uri;
            setPhoto(uri);
          }
        }
      }
    );
  };
  const handleSubmit = () => {
    const formData = {
      title,
      description,
      ingredients,
      recipe,
      author,
      photo,
    };
    console.log("Form submitted:", formData);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionLabel}>_ Create Cocktail</Text>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <TouchableOpacity onPress={selectImage}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.cardImage} />
            ) : (
              <View style={styles.cardImage}>
                <Text style={styles.title}>Tap to select image</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.cardInfo}>
            <TextInput
              style={styles.title}
              placeholder="Enter Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.description}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.sectionTitle}>Ingredients</Text>
            <TextInput
              style={styles.textArea}
              placeholder="List your ingredients here"
              value={ingredients}
              onChangeText={setIngredients}
              multiline
            />

            <Text style={styles.sectionTitle}>Recipe</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Explain the recipe steps"
              value={recipe}
              onChangeText={setRecipe}
              multiline
            />

            <Text style={styles.sectionTitle}>Author</Text>
            <TextInput
              style={styles.author}
              placeholder="Your name"
              value={author}
              onChangeText={setAuthor}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit Cocktail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.sectionLabel}>_ Your Creation</Text>
      <CocktailCard
        image={{
          uri: "https://images.unsplash.com/photo-1572414496015-d6fdc8d43d3e",
        }}
        title="Title"
        ingredients={["grenadine syrup", "peach syrup", "blue curaçao"]}
        recipe="Shake all ingredients in a shaker and pour into a martini glass (or fill 6 glasses)."
        isCreated={true}
        onDelete={() => console.log("Delete pressed")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "#fff",
  },
  sectionLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    gap: 16,
  },
  cardImage: {
    width: 160,
    height: 160,
    borderRadius: 16,
    backgroundColor: "#ccc",
  },
  cardInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stars: {
    fontSize: 16,
    color: "#f5a623",
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    color: "#666",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 14,
  },
  ingredient: {
    fontSize: 13,
    color: "#444",
  },
  textArea: {
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    minHeight: 60,
  },
  stepButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  stepText: {
    color: "#fff",
    fontSize: 11,
  },
  recipeText: {
    fontSize: 12,
    color: "#555",
    lineHeight: 18,
  },
  author: {
    fontSize: 12,
    color: "#777",
    textAlign: "right",
    marginTop: 10,
  },
  deleteButton: {
    marginTop: 12,
    alignSelf: "flex-end",
    backgroundColor: "#e33",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});