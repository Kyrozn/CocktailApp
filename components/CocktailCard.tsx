import { ServerName } from "@/app/(tabs)";
import TabTwoScreen from "@/app/(tabs)/two";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable
} from "react-native";
export type Cocktail = {
  ID: string;
  Name: string;
  Description: string;
  Rating: number;
  Taste: string;
};

export const CocktailCard = ({ data }: { data: Cocktail }) => {
  const img = `http://${ServerName}:5050/cocktailImage/${data.Name.toLowerCase()
    .split(" ")
    .join("")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`;

  const maxStars = 5;
  const filledStars = data.Rating
    ? Math.min(Math.floor(data.Rating), maxStars)
    : 0;
  const emptyStars = maxStars - filledStars;
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/cocktailPage",
          params: {
            cocktailId: data.ID,
          },
        })
      }
    >
      <View style={styles.cocktail.cards.card}>
        <Image source={{ uri: img }} style={styles.cocktail.cards.image} />
        <View style={styles.cocktail.cards.content}>
          <View style={styles.cocktail.cards.contentHeader}>
            <Text style={styles.cocktail.cards.title}>{data.Name}</Text>
            {
              <View style={styles.cocktail.cards.stars}>
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
            }
          </View>
          <Text style={styles.cocktail.cards.description}>
            {data.Description} {" "}
            <Text style={{ fontWeight: "bold" }}>{data.Taste}</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = (() => {
  const global = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: "#fff",
    },
    section: {
      marginBottom: 48,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignSelf: "flex-start",
    },
    buttonText: {
      fontSize: 16,
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
    },
    reception: StyleSheet.create({
      image: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000",
      },
      background: {
        marginInline: 80,
        maxWidth: 845,
      },
      title: {
        flex: 1,
        fontSize: 65,
        fontWeight: "bold",
        color: "#fff",
        marginEnd: 100,
        marginBottom: 20,
      },
      description: {
        flex: 1,
        fontSize: 25,
        lineHeight: 40,
        color: "#fff",
      },
    }),
    taste: {
      padding: 6,
      marginHorizontal: 5,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    discover: StyleSheet.create({
      container: {
        paddingTop: 48,
        paddingInline: 24,
        marginInline: "auto",
        width: "100%",
        maxWidth: 1250,
        backgroundColor: "#fff",
      },
      content: {
        flexDirection: "row",
        alignItems: "stretch",
      },
      imageWrapper: {
        width: "33.33%",
        position: "relative",
      },
      overlay: {
        position: "absolute",
        backgroundColor: "#f5f5f5",
        borderTopRightRadius: 47,
        borderBottomLeftRadius: 115,
        left: -96,
        top: -48,
        width: "100%",
        height: "100%",
      },
      image: {
        height: "100%",
        resizeMode: "cover",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 76,
        borderTopLeftRadius: 104,
        borderTopRightRadius: 45,
        position: "relative",
        maxWidth: "100%",
      },
      textWrapper: {
        paddingRight: 48,
        paddingLeft: 80,
        width: "66.67%",
      },
      title: {
        fontSize: 48,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 20,
      },
      description: {
        fontSize: 20,
        lineHeight: 28,
        textAlign: "left",
        marginBottom: 12,
        color: "#333",
      },
      list: {
        marginTop: 8,
        marginBottom: 48,
      },
      listItem: {
        fontSize: 20,
        marginBottom: 12,
      },
    }),
    cocktail: {
      div: StyleSheet.create({
        container: {
          paddingTop: 48,
          paddingInline: 24,
          marginInline: "auto",
          width: "100%",
          maxWidth: 1250,
          backgroundColor: "#fff",
        },
        title: {
          fontSize: 48,
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: 20,
        },
      }),
      cards: StyleSheet.create({
        container: {
          width: "100%",
          justifyContent: "center",
          flexDirection: "row",
          gap: 32,
        },
        card: {
          backgroundColor: "white",
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
          width: 320,
          overflow: "hidden",
          height: "100%",
        },
        image: {
          width: "100%",
          height: 250,
          resizeMode: "cover",
        },
        content: {
          paddingBlock: 24,
          paddingInline: 24,
          alignItems: "center",
        },
        contentHeader: {
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 8,
        },
        title: {
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        },
        stars: {
          flexDirection: "row",
          marginTop: 8,
        },
        description: {
          fontSize: 16,
          color: "#555",
          textAlign: "left",
          marginTop: 8,
          width: "100%",
        },
      }),
    },
    container: {
      margin: 20,
    },
  };
})();