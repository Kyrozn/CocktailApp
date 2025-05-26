import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import Colors from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "@/components/useColorScheme";
import { AuthPath, ServerName } from ".";

const isWeb = Platform.OS === "web";

type UserProfile = {
  userID: string;
  username: string;
  email: string;
  profileImage: string;
};

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  const fetchProfile = async () => {
    try {
        const UserID = await SecureStore.getItemAsync("Id");
        const response = await fetch(
          `http://${ServerName}:5050${AuthPath}profil/`,
          {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", 
            body: JSON.stringify({ id: UserID }),
          }
        );
        
        const data = await response.json();
        if (data.success) {
            setUser(data.profil);
        } else {
            console.log("Error:", data.message);
        }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image
          source={{
            uri: `http://${ServerName}:5050/profileImage/${
              user.profileImage
            }`,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{user.username}</Text>
        <Text style={styles.text}>{user.email}</Text>

        <ScrollView style={styles.infoBox}>
          <Text style={styles.text}>UserID: {user.userID}</Text>
          {/* Add more user info here if needed */}
        </ScrollView>

        <Pressable onPress={() => console.log("Edit pressed")}>
          {({ pressed }) => (
            <FontAwesome
              name="edit"
              size={24}
              color={Colors[isLight ? "light" : "dark"].text}
              style={{
                opacity: pressed ? 0.5 : 1,
                marginTop: 20,
              }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: isWeb ? "flex-start" : "center",
    justifyContent: "center",
    padding: 20,
  },
  profileBox: {
    width: isWeb ? "50%" : "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 5,
  },
  infoBox: {
    width: "100%",
    marginTop: 20,
  },
});
