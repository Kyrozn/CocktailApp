import {
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  SafeAreaView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
const isWeb = Platform.OS === "web";

export default function TabOneScreen() {
  const [selectedOption, setSelectedOption] = useState<string>("new");
  const [text, onChangeText] = React.useState("");
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";
  const options = [
    { key: "new", label: "New" },
    { key: "price_asc", label: "Price ascending" },
    { key: "price_desc", label: "Price descending" },
    { key: "rating", label: "Rating" },
  ];

  const handleSelect = (key: string) => {
    setSelectedOption(key);
    // Ajouter ici la logique pour trier les éléments selon l'option sélectionnée
  };
  if (!isWeb) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <View style={styles.container}>
        <View style={styles.searchBarBox}>
          <Pressable onPress={() => setModalVisible(true)}>
            {({ pressed }) => (
              <FontAwesome
                name="sliders"
                size={30}
                color={Colors[isLight ? "light" : "dark"].text}
                style={{
                  opacity: pressed ? 0.5 : 1,
                  height: "auto",
                  padding: 5,
                  borderRadius: 90,
                }}
              />
            )}
          </Pressable>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: "white" }, // Dynamic styling
            ]}
            onChangeText={onChangeText}
            placeholder="Search Any cocktail"
            placeholderTextColor={isLight ? "grey" : "lightgrey"}
            value={text}
          />
        </View>
        <ScrollView
          horizontal={true}
          style={{ maxHeight: "10%", alignContent: "center" }}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.button,
                selectedOption === option.key && styles.selectedButton,
              ]}
              onPress={() => handleSelect(option.key)}
            >
              <Text
                style={[
                  styles.text,
                  selectedOption === option.key && styles.text,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>Hello World!</Text>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        ></View>
        <View style={styles.Cocktails}>
          <View></View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.filters}></View>
        <View style={{ height: "100%", width: "75%" }}>
          <View style={styles.searchBarBox}>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: "white" }, // Dynamic styling
              ]}
              onChangeText={onChangeText}
              placeholder="Search Any cocktail"
              placeholderTextColor={isLight ? "grey" : "lightgrey"}
              value={text}
            />
            <ScrollView
              horizontal={true}
              style={{ maxHeight: "100%", alignContent: "center" }}
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.button,
                    selectedOption === option.key && styles.selectedButton,
                  ]}
                  onPress={() => handleSelect(option.key)}
                >
                  <Text
                    style={[
                      styles.text,
                      selectedOption === option.key && styles.text,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.Cocktails}>
            <View style={styles.cocktail}>
              <Image
                style={{}}
                //source={require('')}
              />
              <Text style={styles.text}>Some Cocktails</Text>
              <Text style={styles.text}>SomePrice € or $</Text>
            </View>
            <View style={styles.cocktail}>
              <Image
                style={{}}
                //source={require('')}
              />
              <Text style={styles.text}>Some Cocktails</Text>
              <Text style={styles.text}>SomePrice € or $</Text>
            </View>
            <View style={styles.cocktail}>
              <Image
                style={{}}
                //source={require('')}
              />
              <Text style={styles.text}>Some Cocktails</Text>
              <Text style={styles.text}>SomePrice € or $</Text>
            </View>
            <View style={styles.cocktail}>
              <Image
                style={{}}
                //source={require('')}
              />
              <Text style={styles.text}>Some Cocktails</Text>
              <Text style={styles.text}>SomePrice € or $</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: isWeb ? "flex-start" : "center",
    justifyContent: "flex-start",
    flexDirection: isWeb ? "row" : "column",
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
    color: isWeb ? "white" : "black",
    fontSize: 14,
  },
  tags: {
    flexDirection: "row",
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
    backgroundColor: "transparent"
  },
  modalView: {
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
});
