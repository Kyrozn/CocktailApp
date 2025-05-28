import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { AuthPath, ServerName } from "@/app/(tabs)";
import { UserProfile } from "@/app/(tabs)/profil";
import axios from "axios";

export const Header: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const UserID = localStorage.getItem("token");
        if (!UserID) {
          console.warn("Aucun token trouvé.");
          return;
        }

        const { data } = await axios.post(
          `http://${ServerName}:5050${AuthPath}profil/`,
          { userId: UserID }
        );

        if (data.success) {
          setUser(data.profil[0]);
        } else {
          console.log("Erreur:", data.message);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push({ pathname: "/" })}>
          <Image
            source={{ uri: `http://${ServerName}:5050/cocktailImage/logo.svg` }}
            style={styles.logo}
          />
        </TouchableOpacity>

        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => router.push({ pathname: "/" })}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/cocktails" })}
          >
            <Text style={styles.navText}>Cocktails</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/createCocktail" })}
          >
            <Text style={styles.navText}>Your Cockails</Text>
          </TouchableOpacity>
        </View>

        {user ? (
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/profil" })}
          >
            <Text style={styles.profileText}>
              {user.First_name} {user.Last_name}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push({ pathname: "/auth" })}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6, // Android
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  navLinks: {
    flexDirection: "row",
    gap: 24,
  },
  navText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#2C2C2C",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
  profileText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C2C2C",
  },
});

export default Header;
