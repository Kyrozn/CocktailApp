import * as SecureStore from "expo-secure-store";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAuth } from "../../components/authContext";
import jsSha512 from "js-sha512";
import axios from "axios";
import { AuthPath, ServerName } from ".";
import { router } from "expo-router";

type SignupProps = {
  switchForm: () => void;
};

export default function Register({ switchForm }: SignupProps) {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const {
    name,
    setName,
    Sname,
    setSName,
    email,
    setEmail,
    password,
    setPassword,
    agreed,
    setAgreed,
  } = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !name || !Sname) {
      setErrorMessage("All fields are required");
      return;
    }

    if (!agreed) {
      setErrorMessage("You need to accept the terms and conditions");
      return;
    }

    setErrorMessage(""); // reset
    setLoading(true);

    const payload = {
      email: email,
      name: name,
      Sname: Sname,
      password: jsSha512.sha512(password),
    };

    try {
      const response = await axios.post(
        `https://${ServerName}:5050${AuthPath}login/`,
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.code === "200" && response.data?.success === true) {
        await SecureStore.setItemAsync("token", response.data.token);
        router.push("/");
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Get Started Now</Text>

        {errorMessage !== "" && (
          <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
        )}

        <TextInput
          placeholder="Enter your First name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your Last name"
          value={Sname}
          onChangeText={setSName}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => setAgreed(!agreed)}
          style={styles.checkboxContainer}
        >
          <View style={[styles.checkbox, agreed && styles.checked]} />
          <Text style={styles.checkboxText}>
            I agree to the{" "}
            <Text style={{ color: "#007bff" }}>terms & policy</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignup}
          style={styles.signupBtn}
          disabled={loading}
        >
          <Text style={styles.signupText}>
            {loading ? "Signing up..." : "Signup"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.or}>or</Text>

        <View style={styles.oauthContainer}>
          <TouchableOpacity style={styles.oauthBtn}>
            <Text>🔵 Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oauthBtn}>
            <Text>⚫ Sign in with Apple</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.oauthBtn} onPress={switchForm}>
          <Text>
            Already have an account?{" "}
            <Text style={{ color: "#007bff" }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 8,
    borderRadius: 4,
  },
  checked: {
    backgroundColor: "#000",
  },
  checkboxText: {
    fontSize: 14,
  },
  signupBtn: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  signupText: {
    color: "#fff",
    fontWeight: "bold",
  },
  or: {
    textAlign: "center",
    marginBottom: 10,
    color: "#666",
  },
  oauthContainer: {
    gap: 10,
    marginBottom: 20,
  },
  oauthBtn: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
