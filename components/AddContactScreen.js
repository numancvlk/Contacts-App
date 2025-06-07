import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from "react-native";

export default function AddContactScreen({ navigation, route }) {
  const { addContact } = route.params;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    if (!name) {
      Alert.alert("Invalid Input", "Name is required.");
      return;
    }

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert(
        "Invalid Phone",
        "Phone number must be exactly 11 digits and contain only numbers."
      );
      return;
    }

    const newContact = {
      id: Date.now().toString(),
      name: name,
      phone: phone,
      image: image,
    };

    addContact(newContact);
    setName("");
    setPhone("");
    setImage("");
    navigation.goBack();
  };

  return (
    <View style={myStyles.container}>
      <TextInput
        style={myStyles.inputs}
        placeholder="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <TextInput
        style={myStyles.inputs}
        placeholder="Phone (11 digits)"
        value={phone}
        keyboardType="numeric"
        onChangeText={(text) => {
          setPhone(text);
        }}
        maxLength={11}
      />
      <TextInput
        style={myStyles.inputs}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <TouchableOpacity style={myStyles.addButton} onPress={handleAdd}>
        <Text style={myStyles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    padding: 8,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 8,
    padding: 8,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
