import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "../../components/authContext";
import axios from "axios";
import { AuthPath, ServerName } from ".";
import { router } from "expo-router";
import jsSha512 from "js-sha512";
type LoginProps = {
  switchForm: () => void;
};
export default function Login({ switchForm }: LoginProps) {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    agreed,
    setAgreed,
    isLoginForm,
    setStateForm,
    stayConnected,
    setStayConnected,
  } = useAuth();

  const handleSignin = async () => {
    if (!email || !password) {
      return;
    }
    const payload = {
      email: email,
      password: jsSha512.sha512(password),
    };
    axios
      .post(`http://${ServerName}:5050${AuthPath}login`, payload)
      .then(async (response) => {
        const { data } = response;
        console.log(data);
        if (data.success && data.token) {
          localStorage.setItem("token", data.user.id);
          router.push("/");
          return;
        }
      })
      .catch((err) => {
        console.error("Erreur de login :", err.response?.data || err.message);
      });
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.footerText}>
        Enter your Credentials to access your account
      </Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => setStayConnected(!stayConnected)}>
        <Text>{stayConnected ? "☑" : "☐"} Stay connected for 30 days</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignin} style={styles.signupBtn}>
        <Text style={styles.signupText}>Login</Text>
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
          Don't have an account?{" "}
          <Text style={{ color: "#007bff" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
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
  footerText: {
    textAlign: "center",
    color: "#333",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 10,
    borderTopLeftRadius: 40,
  },
});
