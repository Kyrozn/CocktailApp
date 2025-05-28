import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";
import { CocktailPath, ServerName } from ".";
import axios from "axios";

type CocktailCardProps = {
  image: any;
  title: string;
  ingredients: string[];
  recipe: string;
  isCreated: boolean;
  onDelete?: () => void;
};

const MyTextInput: React.FC<TextInputProps> = (props) => (
  <TextInput placeholderTextColor="rgba(0,0,0,0.3)" {...props} />
);

const AutoGrowingTextInput: React.FC<TextInputProps> = ({
  style,
  ...props
}) => {
  const [inputHeight, setInputHeight] = useState(60);

  return (
    <TextInput
      {...props}
      placeholderTextColor="rgba(0,0,0,0.3)"
      multiline
      onContentSizeChange={(event) =>
        setInputHeight(event.nativeEvent.contentSize.height)
      }
      style={[style, { height: inputHeight }]}
    />
  );
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
  const [ingredientFields, setIngredientFields] = useState([
    { name: "", category: "", alcohol: "" },
  ]);
  const [recipe, setRecipe] = useState("");
  const [author, setAuthor] = useState("");
  const [authorId, setAuthorId] = useState<string | null>("");
  const [taste, setTaste] = useState("");
  function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
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

  const handleSubmit = async () => {
    // Si authorId ne change jamais, évite de le set ici
    const currentAuthorId = "ac07a1be-b047-4a53-9d28-010b4868f2ef";

    if (
      !recipe ||
      !title ||
      !description ||
      !currentAuthorId ||
      !photo ||
      !taste
    ) {
      setErrorMessage(
        "Please be sure to complete every information and select a photo"
      );
      return;
    }

    const blob = photo ? dataURLtoBlob(photo) : undefined;

    // Calcul de la moyenne d'alcool
    let totalAlcohol = 0;
    let count = 0;
    ingredientFields.forEach((ingredient) => {
      if (
        ingredient.alcohol !== undefined &&
        !isNaN(Number(ingredient.alcohol))
      ) {
        totalAlcohol += Number(ingredient.alcohol);
        count++;
      }
    });
    const averageAlcohol = count > 0 ? totalAlcohol / count : 0;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredientList", JSON.stringify(ingredientFields));
    formData.append("recipe", recipe);
    formData.append("taste", taste);
    formData.append("alcohol", averageAlcohol.toString());
    formData.append("authorId", currentAuthorId);

    if (blob) {
      const fileName =
        title
          .toLowerCase()
          .split(" ")
          .join("")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") + ".png";
      formData.append("photo", blob, fileName);
    }

    try {
      const response = await axios.post(
        `http://${ServerName}:5050/api/recipes`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.success) {
        console.log("Recette envoyée avec succès :", response.data);
        // reset form or redirect if needed
      } else {
        setErrorMessage(
          response.data?.message || "Erreur lors de la création de la recette"
        );
      }
    } catch (error: any) {
      console.error("Erreur axios :", error.message);
      setErrorMessage("Erreur lors de l'envoi de la recette");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionLabel}>_ Create Cocktail</Text>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardImage}>
            <TouchableOpacity onPress={selectImage}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.cardImage} />
              ) : (
                <View style={styles.cardImage}>
                  <Text style={styles.title}>Tap to select image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.cardInfo}>
            <MyTextInput
              style={styles.textAreaTitle}
              placeholder="Enter Title"
              value={title}
              onChangeText={setTitle}
            />
            <AutoGrowingTextInput
              style={styles.textArea}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.sectionTitle}>Ingredients</Text>
            {ingredientFields.map((item, index) => (
              <View key={index} style={{ marginBottom: 12 }}>
                <MyTextInput
                  style={styles.textArea}
                  placeholder="Ingredient name"
                  value={item.name}
                  onChangeText={(text) => {
                    const updated = [...ingredientFields];
                    updated[index].name = text;
                    setIngredientFields(updated);
                  }}
                />
                <View style={[styles.textAreaDropdown, { padding: 0 }]}>
                  <Picker
                    selectedValue={item.category}
                    onValueChange={(value: string) => {
                      const updated = [...ingredientFields];
                      updated[index].category = value;
                      setIngredientFields(updated);
                    }}
                    style={{ width: "100%" }}
                  >
                    <Picker.Item label="Select category..." value="" />
                    <Picker.Item label="Alcohol" value="Alcohol" />
                    <Picker.Item label="Juice" value="Juice" />
                    <Picker.Item label="Sirop" value="Sirop" />
                    <Picker.Item label="Soft" value="Soft" />
                    <Picker.Item label="Trim" value="Trim" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>

                <MyTextInput
                  style={styles.textArea}
                  placeholder="Alcohol content (%)"
                  keyboardType="numeric"
                  value={item.alcohol}
                  onChangeText={(text) => {
                    const updated = [...ingredientFields];
                    updated[index].alcohol = text;
                    setIngredientFields(updated);
                  }}
                />
              </View>
            ))}
            <TouchableOpacity
              style={[
                styles.submitButton,
                { marginBottom: 20, backgroundColor: "#444" },
              ]}
              onPress={() =>
                setIngredientFields([
                  ...ingredientFields,
                  { name: "", category: "", alcohol: "" },
                ])
              }
            >
              <Text style={styles.submitText}>+ Add Ingredient</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Recipe</Text>
            <AutoGrowingTextInput
              style={styles.textArea}
              placeholder={`Explain the recipe steps here like this:\n- Step 1\n- Step 2\n- etc`}
              value={recipe}
              onChangeText={setRecipe}
            />
            <Text style={styles.sectionTitle}>Taste</Text>
            <View style={[styles.textAreaDropdown, { padding: 0 }]}>
              <Picker
                selectedValue={taste}
                onValueChange={(value: string) => setTaste(value)}
                style={{ width: "100%" }}
              >
                <Picker.Item label="Select taste..." value="" />
                <Picker.Item label="Sweet" value="Sweet" />
                <Picker.Item label="Sour" value="Sour" />
                <Picker.Item label="Strong" value="Strong" />
              </Picker>
            </View>

            <Text style={styles.sectionTitle}>Author</Text>
            <MyTextInput
              style={styles.textArea}
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 70,
  },
  cardImage: {
    width: 460,
    height: 540,
    borderRadius: 15,
    backgroundColor: "#ccc",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
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
    width: 500,
    textAlignVertical: "top",
  },
  textAreaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    minHeight: 60,
  },
  textAreaDropdown: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    marginVertical: 8,
    paddingHorizontal: 15,
    justifyContent: "center",
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

function setErrorMessage(arg0: string) {
  console.warn(arg0);
}
