import { ServerName } from ".";
import AppFooter from "@/components/AppFooter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React from "react";
import { CocktailCard } from "@/components/CocktailCard";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

//

const Header: React.FC = () => {
  return (
    <View style={out.headerContainer}>
      <View style={out.nav}>
        <View style={out.header}>
          <Text style={out.title}>This is the header</Text>
          <Text>User Infos</Text>
        </View>
      </View>
    </View>
  );
};

const out = StyleSheet.create({
  headerContainer: {
    position: "relative",
  },
  nav: {
    width: "100%",
    paddingInline: 40,
    marginBlock: "auto",
    backgroundColor: "#fff",
  },
  header: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

const DiscoverListItem = ({ content }: { content: string }) => {
  return (
    <Text style={styles.discover.listItem}>
      {"• "}
      {content}
    </Text>
  );
};

const HomePage = () => {
  return (
    <View style={styles.global.body}>
      <Header />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 700, ...styles.global.section }}>
          <ImageBackground
            source={{
              uri: "https://img.freepik.com/fotos-kostenlos/ein-erfrischender-mojito-cocktail-mit-limettenscheiben-generativer-ai_188544-12369.jpg?t=st=1741188535~exp=1741192135~hmac=5d899147eaf7546ac316c86301aa0c11ed8b4603a17d6a985848966c8ad2a552&w=996",
            }}
            resizeMode="cover"
            style={styles.reception.image}
            imageStyle={{ opacity: 0.75 }} // Équivalent du filtre brightness
          >
            <View style={styles.reception.background}>
              <Text style={styles.reception.title}>
                Welcome to the Cocktail App!
              </Text>
              <Text style={styles.reception.description}>
                Unleash your inner mixologist and elevate every occasion with
                CocktailApp! Explore a vast library of cocktail recipes, from
                classic Martinis to innovative blends crafted with precision and
                insider tips for cocktail mastery.
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View
          style={{ ...styles.discover.container, ...styles.global.section }}
        >
          <View style={styles.discover.content}>
            <View style={styles.discover.imageWrapper}>
              <View style={styles.discover.overlay} />
              <Image
                style={styles.discover.image}
                source={{
                  uri: "https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/35d005d7-a717-4128-8e62-4f70e6be2d00/public",
                }}
              />
            </View>
            <View style={styles.discover.textWrapper}>
              <Text style={styles.discover.title}>
                Discover the Art of Cocktails
              </Text>
              <Text style={styles.discover.description}>
                Elevate your cocktail experience with an array of recipes
                designed for every palate. From refreshing classics like Mojitos
                to adventurous blends that impress, we have you covered.
              </Text>
              <Text style={styles.discover.description}>
                Master essential mixology techniques that transform you into a
                cocktail connoisseur.
              </Text>
              <FlatList
                data={[
                  "Diverse cocktail recipes for every occasion",
                  "Step-by-step guides to perfect your technique",
                  "Insights into the history and artistry of cocktails",
                  "Join a thriving community of cocktail enthusiasts",
                ]}
                contentContainerStyle={styles.discover.list}
                renderItem={({ item }) => <DiscoverListItem content={item} />}
              />
              <TouchableOpacity
                style={styles.button.bg.primary}
                onPress={() => router.push('/cocktails')}
              >
                <Text style={styles.button.text.primary}>
                  Explore Our Cocktail Recipes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{ ...styles.cocktail.div.container, ...styles.global.section }}
        >
          <Text style={styles.cocktail.div.title}>Our Best Cocktails</Text>
          <FlatList
            data={[
              {
                ID: "1",
                Name: "Mojito",
                Description:
                  "Un cocktail rafraîchissant à base de menthe et de citron vert.",
                Rating: 4,
                Taste: "chiant"
              },
              {
                ID: "1",
                Name: "Tequila Sunrise",
                Description:
                  "Un cocktail visuellement impressionnant avec des couches de couleurs rappelant un lever de soleil.",
                Rating: 4,
                Taste: "strong"
              },
              {
                ID: "1",
                Name: "Blue Lagoon",
                Description:
                  "Un cocktail exotique et coloré grâce au curaçao bleu.",
                Rating: 2,
                Taste: "sour"
              },
            ]}
            contentContainerStyle={styles.cocktail.cards.container}
            renderItem={({ item }) => <CocktailCard data={item} />}
          />
        </View>

        <AppFooter />
      </ScrollView>
    </View>
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
          height: "99%",
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
        },
      }),
    },
  };
})();

export default HomePage;
