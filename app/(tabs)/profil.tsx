import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { AuthPath, ServerName } from ".";
import Header from "@/components/Header";
const isWeb = Platform.OS === "web";

export type UserProfile = {
  ID: string;
  Email: string;
  First_name: string;
  Last_name: string;
  Role: string;
  profileImage: string;
};

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

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
        setUser(data.profil);
      } else {
        console.log("Erreur:", data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
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
    <View style={{backgroundColor: "white", height: "100%"}}>
      <Header />
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View>
            <Text style={styles.name}>Alexa Rawles</Text>
            <Text style={styles.email}>alexarawles@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} placeholder="Lorem Ipsum" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} placeholder="Lorem Ipsum" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Lorem Ipsum" />
        </View>
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
  text: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    color: "#888",
  },
  editButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  form: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  field: {
    width: "48%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    padding: 10,
  },
});