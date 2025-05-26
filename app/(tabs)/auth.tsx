import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Signup from "./Register";
import Login from "./login";
import { AuthProvider } from "../../components/authContext";

export default function SignupScreen() {
  const [isLoginForm, setForm] = useState(true);
  return (
    <AuthProvider>
      <ScrollView contentContainerStyle={styles.container}>
        {isLoginForm ? (
          <Login switchForm={() => setForm(false)} />
        ) : (
          <Signup switchForm={() => setForm(true)} />
        )}
      </ScrollView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 10,
    borderTopLeftRadius: 40,
  },
});
