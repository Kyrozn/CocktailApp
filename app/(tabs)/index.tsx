import {
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
import {HomePage} from "./homepage";
export const ServerName: string =
  process.env.EXPO_PUBLIC_SERVER_ADDRESS || "localhost";
export const CocktailPath: string | undefined =
  process.env.EXPO_PUBLIC_COCKTAILS_PATH;
export const AuthPath: string | undefined =
  process.env.EXPO_PUBLIC_AUTH_PATH;
export const AdminPath: string | undefined = process.env.EXPO_PUBLIC_ADMIN_PATH;
const isWeb = Platform.OS === "web";

export default function Index() {
    return <HomePage />;
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: isWeb ? "flex-start" : "center",
    justifyContent: "flex-start",
    flexDirection: isWeb ? "row" : "column",
    backgroundColor: "white",
  },
  searchBarBox: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  filters: {
    height: "100%",
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  Cocktails: {
    flex: 1,
    height: "90%",
    width: "100%",
    marginTop: "5%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    overflowY: "scroll",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    color: "white",
  },
  input: {
    height: 40,
    margin: isWeb ? 100 : 12,
    borderWidth: 1,
    padding: 10,
    width: isWeb ? "45%" : "80%",
    color: "black",
    borderRadius: 70,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "grey",
    height: isWeb ? "100%" : "50%",
  },
  selectedButton: {
    backgroundColor: isWeb ? "black" : "white",
  },
  text: {
    color: isWeb ? "black" : "black",
    fontSize: 14,
  },
  cocktail: {
    height: "45%",
    width: "25%",
    margin: "2%",
    borderWidth: 1,
    borderColor: "black",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "transparent",
  },
  modalView: {
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
});
