import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "@/components/useColorScheme";
import { AdminPath, AuthPath, CocktailPath, ServerName } from ".";
import axios from "axios"; // ✅ Ajout de axios

const isWeb = Platform.OS === "web";

type User = {
  ID: string;
  Email: string;
  First_name: string;
  Last_name: string;
  Role: string;
};

type Cocktail = {
  ID: string;
  Name: string;
  Description: string;
  Recipe: string;
  Taste: string;
  Volume: string;
  Alcohol: string;
  CreatorID: string;
  Valid: number;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pendingCocktails, setPendingCocktails] = useState<Cocktail[]>([]);
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://${ServerName}:5050${AdminPath}getAllUsers`,
      );

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const deleteUser = async (userId: string) => {
    try {
      const response = await axios.post(
        `http://${ServerName}:5050${AdminPath}deleteUser`,
        {userId}
      );

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchPendingCocktails = async () => {
    try {
      const response = await axios.get(
        `http://${ServerName}:5050${AdminPath}getUnvalidCocktails`
      );

      if (response.data.success) {
        setPendingCocktails(response.data.cocktails);
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cocktails:", error);
    }
  };

  const approveCocktail = async (cocktailId: string) => {
    try {
      const response = await axios.post(
        `http://${ServerName}:5050${AdminPath}approveCocktail`,
        { cocktailId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        fetchPendingCocktails();
      } else {
        console.log("Erreur approbation:", response.data.message);
      }
    } catch (error) {
      console.error("Erreur approbation cocktail:", error);
    }
  };

  const rejectCocktail = async (cocktailId: string) => {
    try {
      const response = await axios.post(
        `http://${ServerName}:5050${AdminPath}rejectCocktail`,
        { cocktailId },
      );
      if (response.data.success) {
        fetchPendingCocktails();
      } else {
        console.log("Erreur refus:", response.data.message);
      }
    } catch (error) {
      console.error("Erreur refus cocktail:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      await fetchPendingCocktails();
    };
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <Text style={styles.subtitle}>Users</Text>
      {users.map((user) => (
        <View key={user.ID} style={styles.userCard}>
          <Text style={styles.name}>
            {user.First_name} {user.Last_name}
          </Text>
          <Text style={styles.email}>{user.Email}</Text>
          <Text style={styles.role}>Role: {user.Role}</Text>
          <View style={{ width: 150, borderRadius: 6 }}>
            <Button
              title="Refuser"
              onPress={() => deleteUser(user.ID)}
              color="red"
            />
          </View>
        </View>
      ))}

      <Text style={styles.subtitle}>Pending Cocktails for Approval</Text>
      {pendingCocktails.length === 0 && (
        <Text style={styles.noData}>No cocktails pending approval.</Text>
      )}
      {pendingCocktails.map((cocktail) => (
        <View key={cocktail.ID} style={styles.cocktailCard}>
          <Text style={styles.cocktailName}>{cocktail.Name}</Text>
          <Text style={styles.cocktailText}>{cocktail.Description}</Text>
          <Text style={styles.cocktailText}>
            Alcohol: {cocktail.Alcohol} cL
          </Text>
          <Text style={styles.cocktailText}>Volume: {cocktail.Volume} cL</Text>
          <Text style={styles.cocktailText}>Taste: {cocktail.Taste}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button
              title="Approuver"
              onPress={() => approveCocktail(cocktail.ID)}
              color="green"
            />
            <Button
              title="Refuser"
              onPress={() => rejectCocktail(cocktail.ID)}
              color="red"
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// Styles identiques à votre version
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  userCard: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#444",
  },
  role: {
    marginTop: 4,
    fontSize: 14,
    color: "#007AFF",
  },
  cocktailCard: {
    width: "100%",
    backgroundColor: "#e8f8f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  cocktailName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cocktailText: {
    fontSize: 15,
    color: "#333",
  },
  noData: {
    fontStyle: "italic",
    color: "gray",
    marginBottom: 10,
  },
});
